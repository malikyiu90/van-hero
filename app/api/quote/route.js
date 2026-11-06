import { RATES } from "@/lib/rates";
import { makeReference, officeHtml, customerHtml } from "@/lib/quoteEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------- distance (free: postcodes.io + optional OpenRouteService) ---------- */
async function coords(pc) {
  const clean = String(pc || "").trim();
  if (!clean) return null;
  try {
    const r = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`, { cache: "no-store" });
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

function computePrice({ size, inventory, miles, pickup, delivery, extras, hours, crew }) {
  const breakdown = [];
  let subtotal = 0;

  // Labour = hours x crew hourly rate. These are manual inputs in the VMT
  // sheet and default to 0 there, so we do the same: no hours/crew = no
  // labour charge. The office fills them in when confirming the quote.
  const h = Math.max(0, Number(hours) || 0);
  const c = Math.max(0, Math.min(4, Math.round(Number(crew) || 0)));
  const hourly = RATES.crewHourly[c] ?? RATES.crewHourly[4];
  const labour = Math.round(h * hourly);

  // Base call-out is waived on short jobs: up to SHORT_JOB_HOURS the labour
  // stands on its own, beyond that the call-out applies on top. With no hours
  // quoted yet we leave the call-out on, which matches the blank sheet (£48).
  const shortJob = h > 0 && h <= RATES.shortJobHours;
  if (!shortJob) {
    subtotal += RATES.baseCallout;
    breakdown.push({ label: "Base charge", amount: RATES.baseCallout });
  }

  if (labour > 0) {
    subtotal += labour;
    breakdown.push({ label: `Labour (${h}h x ${c} crew)`, amount: labour });
  }

  // mileage
  if (miles) {
    const m = Math.round(Math.max(0, miles - RATES.freeMiles) * RATES.mileageRate);
    if (m) { subtotal += m; breakdown.push({ label: `Mileage (${miles} mi)`, amount: m }); }
  }

  // inventory
  let inv = 0;
  Object.entries(inventory || {}).forEach(([id, q]) => { inv += (parseInt(q, 10) || 0) * (RATES.items[id] || 0); });
  if (inv) { inv = Math.round(inv); subtotal += inv; breakdown.push({ label: "Inventory / items", amount: inv }); }

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

  const vat = Math.round(subtotal * RATES.vat);
  const total = Math.round(subtotal + vat);
  breakdown.push({ label: "VAT (20%)", amount: vat });
  return { total, breakdown, subtotal: Math.round(subtotal) };
}

/* ---------- email via Resend ---------- */
async function sendEmails(ctx) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || "Vmtofficials@gmail.com";
  const from = process.env.QUOTE_FROM_EMAIL || "Van Hero Quotes <quotes@vanhero.online>";
  if (!key) return { sent: false, office: false, customer: false, reason: "RESEND_API_KEY not set" };

  const send = (payload) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => r.ok).catch(() => false);

  const { reference, quote, lead, kind } = ctx;
  const label = quote != null ? ` — £${quote}` : "";
  const office = await send({
    from, to,
    reply_to: lead.email || undefined,
    subject: `${reference}${label} — ${lead.name || "Website lead"}`,
    html: officeHtml(ctx),
  });

  let customer = false;
  if (lead.email) {
    customer = await send({
      from, to: lead.email,
      subject: `Your Van Hero ${kind === "enquiry" ? "enquiry" : "quote"} ${reference}${label}`,
      html: customerHtml(ctx),
    });
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
    const { total, breakdown } = computePrice({ size, inventory, miles: d.miles, pickup, delivery, extras, hours, crew });

    // "preview" mode just returns the price + distance (no email); "quote" mode (final submit) emails the lead.
    // "preview" = price only (no email). "quote" = full calculator submit.
    // "enquiry" = simple service-page form: email the office, no price shown.
    let emailed = false;
    let reference = null;
    if (mode === "quote" || mode === "enquiry") {
      reference = makeReference();
      const isEnquiry = mode === "enquiry";
      const lead = { ...contact, pickup, delivery, moveDate, miles: d.miles, hours, crew, service };
      const res = await sendEmails({
        reference,
        kind: isEnquiry ? "enquiry" : "quote",
        quote: isEnquiry ? null : total,
        breakdown: isEnquiry ? [] : breakdown,
        miles: d.miles, lead, inventory, extras, notes, otherItems,
      });
      emailed = res.sent;
    }

    return Response.json({
      ok: true,
      quote: mode === "enquiry" ? null : total,
      miles: d.miles,
      breakdown: mode === "enquiry" ? [] : breakdown,
      emailed, reference,
    });
  } catch (e) {
    return Response.json({ ok: false, error: "Could not calculate quote." }, { status: 400 });
  }
}
