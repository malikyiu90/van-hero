import { RATES } from "@/lib/rates";
import { makeReference, officeHtml, customerHtml } from "@/lib/quoteEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------- distance (free: postcodes.io + optional OpenRouteService) ---------- */
async function coords(pc) {
  const clean = String(pc || "").trim();
  if (!clean) return null;
  try {
    const r = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return null;
    const j = await r.json();
    if (j.status !== 200 || !j.result) return null;
    return { lat: j.result.latitude, lon: j.result.longitude };
  } catch {
    return null;
  }
}
function haversineMiles(a, b) {
  const R = 3958.8;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
async function drivingMiles(from, to) {
  const a = await coords(from);
  const b = await coords(to);
  if (!a || !b) return { miles: null, a, b };
  const key = process.env.ORS_API_KEY;
  if (key) {
    try {
      const r = await fetch("https://api.openrouteservice.org/v2/directions/driving-car", {
        method: "POST",
        headers: { Authorization: key, "Content-Type": "application/json" },
        body: JSON.stringify({ coordinates: [[a.lon, a.lat], [b.lon, b.lat]] }),
        signal: AbortSignal.timeout(8000),
      });
      if (r.ok) {
        const j = await r.json();
        const m = j?.routes?.[0]?.summary?.distance;
        if (m) return { miles: Math.round(m / 1609.34), a, b, source: "ors" };
      }
    } catch {}
  }
  return { miles: Math.round(haversineMiles(a, b) * 1.3), a, b, source: "estimate" };
}

/* ---------- pricing engine (exact V.M.T Excel model) ---------- */
const floorNum = (f) => ({ "Ground floor": 0, "1st floor": 1, "2nd floor": 2, "3rd floor": 3, "4th+ floor": 4 }[f] || 0);

// Money is kept to the penny. Rounding each line to whole pounds on the way
// through loses real money — 23 miles is £34.50, not £35 — so every line is
// held at 2dp and only the displayed figures are formatted.
const money = (n) => Math.round(n * 100) / 100;

function computePrice({ size, inventory, miles, pickup, delivery, extras, hours, crew }) {
  const breakdown = [];
  let subtotal = 0;

  // Labour = hours x crew hourly rate. These are manual inputs in the VMT
  // sheet and default to 0 there, so we do the same: no hours/crew = no
  // labour charge. The office fills them in when confirming the quote.
  // Work out the hours the way a human quoting this job would: how long the
  // crew spends driving to the address, plus loading and unloading it. The
  // office can still override both by passing hours/crew explicitly.
  const driveHours = miles ? Math.round((miles / RATES.avgSpeedMph) * 2) / 2 : 0;

  // Every inventory item is already priced for the work of moving it, so
  // adding property-size handling hours on top charges twice for the same
  // lifting. Handling time is therefore only estimated when the customer
  // hasn't listed what they're moving — otherwise labour covers travel alone.
  const itemsListed = Object.values(inventory || {}).some((q) => (parseInt(q, 10) || 0) > 0);
  const handling = itemsListed ? 0 : (RATES.handling[size] ?? RATES.defaultHandling);
  const estimatedHours = Math.round((driveHours + handling) * 2) / 2;

  const explicitHours = Number(hours) > 0;
  const h = explicitHours ? Math.max(0, Number(hours)) : estimatedHours;

  const explicitCrew = Number(crew) > 0;
  const c = explicitCrew
    ? Math.max(1, Math.min(4, Math.round(Number(crew))))
    : (RATES.crewFor[size] ?? RATES.defaultCrew);

  const hourly = RATES.crewHourly[c] ?? RATES.crewHourly[4];
  const labour = money(h * hourly);

  // Base call-out is waived on short jobs: up to SHORT_JOB_HOURS the labour
  // stands on its own, beyond that the call-out applies on top. With no hours
  // quoted yet we leave the call-out on, which matches the blank sheet (£48).
  // A short job pays labour only. "Short" covers a quote with no hours on it
  // but real work priced elsewhere (items, mileage, add-ons) — otherwise a
  // six-mile three-item move picked up the call-out that a three-hour job
  // escapes. A truly blank quote still carries it, matching the sheet (£48).
  const hasChargeableWork =
    Object.values(inventory || {}).some((q) => (parseInt(q, 10) || 0) > 0) ||
    Number(miles) > 0 ||
    (extras || []).length > 0;
  const shortJob = h <= RATES.shortJobHours && (h > 0 || hasChargeableWork);
  if (!shortJob) {
    subtotal += RATES.baseCallout;
    breakdown.push({ label: "Base charge", amount: RATES.baseCallout });
  }

  if (labour > 0) {
    subtotal += labour;
    breakdown.push({
      label: driveHours && !explicitHours
        ? `Labour (${h}h x ${c} crew — ${driveHours}h travel${handling ? ` + ${handling}h handling` : ""})`
        : `Labour (${h}h x ${c} crew)`,
      amount: labour,
    });
  }

  // mileage
  if (miles) {
    const m = money(Math.max(0, miles - RATES.freeMiles) * RATES.mileageRate);
    if (m) { subtotal += m; breakdown.push({ label: `Mileage (${miles} mi)`, amount: m }); }
  }

  // inventory
  let inv = 0;
  Object.entries(inventory || {}).forEach(([id, q]) => { inv += (parseInt(q, 10) || 0) * (RATES.items[id] || 0); });
  if (inv) { inv = money(inv); subtotal += inv; breakdown.push({ label: "Inventory / items", amount: inv }); }

  // access per address (flats, no usable lift)
  [["Collection", pickup], ["Delivery", delivery]].forEach(([lbl, p]) => {
    if (!p || p.type !== "Flat") return;
    const fl = floorNum(p.floor);
    if (fl > 0 && !p.lift) {
      const s = fl * RATES.stairsPerFloor;
      subtotal += s;
      breakdown.push({ label: `${lbl} stairs (${fl} floor)`, amount: s });
      subtotal += RATES.noLiftSurcharge;
      breakdown.push({ label: `${lbl} no lift`, amount: RATES.noLiftSurcharge });
    }
  });

  // optional extras (packing / furniture work)
  (extras || []).forEach((x) => {
    const amt = RATES.extras[x] || 0;
    if (amt) { subtotal += amt; breakdown.push({ label: x, amount: amt }); }
  });

  subtotal = money(subtotal);
  const vat = money(subtotal * RATES.vat);
  const total = money(subtotal + vat);
  breakdown.push({ label: "VAT (20%)", amount: vat });
  return { total, breakdown, subtotal, usedHours: h, usedCrew: c };
}

/* ---------- email via Resend ---------- */
async function sendEmails(ctx) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || "Vmtofficials@gmail.com";
  const from = process.env.QUOTE_FROM_EMAIL || "Van Hero Quotes <quotes@vanhero.online>";
  if (!key) return { sent: false, office: false, customer: false, reason: "RESEND_API_KEY not set" };

  // A swallowed send is a lost lead, so failures are logged and retried once.
  async function send(payload, label) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(12000),
        });
        if (r.ok) return true;
        const body = await r.text().catch(() => "");
        console.error(`[quote] ${label} email failed (attempt ${attempt}, HTTP ${r.status}): ${body.slice(0, 300)}`);
      } catch (e) {
        console.error(`[quote] ${label} email threw (attempt ${attempt}): ${e?.message || e}`);
      }
    }
    return false;
  }

  const { reference, quote, lead, kind } = ctx;
  const label = quote != null ? ` — £${Number(quote).toFixed(2)}` : "";
  const office = await send({
    from, to,
    reply_to: lead.email || undefined,
    subject: `${reference}${label} — ${lead.name || "Website lead"}`,
    html: officeHtml(ctx),
  }, "office");

  let customer = false;
  if (lead.email) {
    customer = await send({
      from, to: lead.email,
      subject: `Your Van Hero ${kind === "enquiry" ? "enquiry" : "quote"} ${reference}${label}`,
      html: customerHtml(ctx),
    }, "customer");
  }
  return { sent: office || customer, office, customer };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { pickup = {}, delivery = {}, inventory = {}, contact = {}, moveDate = "", mode = "quote", hours = 0, crew = 0 } = body;
    const extras = body.extras || body.packing || [];
    const notes = String(body.notes || "").slice(0, 2000);
    const service = String(body.service || "").slice(0, 120);
    const otherItems = String(body.otherItems || "").slice(0, 1000);

    const d = await drivingMiles(pickup.postcode, delivery.postcode);
    const size = pickup.size || delivery.size || "2 Bed House";
    const { total, breakdown, usedHours, usedCrew } = computePrice({ size, inventory, miles: d.miles, pickup, delivery, extras, hours, crew });

    // "preview" mode just returns the price + distance (no email); "quote" mode (final submit) emails the lead.
    // "preview" = price only (no email). "quote" = full calculator submit.
    // "enquiry" = simple service-page form: email the office, no price shown.
    let emailed = false;
    let reference = null;
    if (mode === "quote" || mode === "enquiry") {
      reference = makeReference();
      const isEnquiry = mode === "enquiry";
      const lead = { ...contact, pickup, delivery, moveDate, miles: d.miles,
        hours: usedHours, crew: usedCrew, service };
      try {
        const res = await sendEmails({
          reference,
          kind: isEnquiry ? "enquiry" : "quote",
          quote: isEnquiry ? null : total,
          breakdown: isEnquiry ? [] : breakdown,
          miles: d.miles, lead, inventory, extras, notes, otherItems,
        });
        emailed = res.sent;
      } catch (e) {
        // The customer still gets their price and reference; we log loudly so
        // the lead can be chased from the server logs.
        console.error(`[quote] ${reference} email step failed entirely:`, e?.message || e);
      }
      if (!emailed) {
        console.error(`[quote] ${reference} NOT EMAILED — lead: ${contact?.name || "?"} ${contact?.phone || ""} ${contact?.email || ""} — £${total}`);
      }
    }

    return Response.json({
      ok: true,
      quote: mode === "enquiry" ? null : total,
      miles: d.miles,
      breakdown: mode === "enquiry" ? [] : breakdown,
      emailed, reference,
    });
  } catch (e) {
    console.error("[quote] request failed:", e?.message || e);
    return Response.json({ ok: false, error: "Could not calculate quote." }, { status: 400 });
  }
}
