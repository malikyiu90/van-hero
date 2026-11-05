import { RATES } from "@/lib/rates";

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

function computePrice({ size, inventory, miles, pickup, delivery, extras }) {
  const breakdown = [];
  let subtotal = 0;

  // base call-out
  subtotal += RATES.baseCallout;
  breakdown.push({ label: "Base charge", amount: RATES.baseCallout });

  // labour = hours × crew hourly rate (crew + hours estimated from property size)
  const est = RATES.estimate[size] || RATES.defaultEstimate;
  const labour = est.hours * (RATES.crewHourly[est.crew] || 40);
  subtotal += labour;
  breakdown.push({ label: `Labour (${est.hours}h × ${est.crew} crew)`, amount: labour });

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
async function sendEmails({ lead, quote, breakdown, miles }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || "Vmtofficials@gmail.com";
  const from = process.env.QUOTE_FROM_EMAIL || "Van Hero Quotes <onboarding@resend.dev>";
  if (!key) return { sent: false, reason: "RESEND_API_KEY not set" };

  const rows = breakdown.map((b) => `<tr><td style="padding:4px 10px">${b.label}</td><td style="padding:4px 10px;text-align:right">£${b.amount}</td></tr>`).join("");
  const leadHtml = `
    <div style="font-family:Arial,sans-serif;color:#040542">
      <h2>New Quote Request — £${quote}</h2>
      <p><strong>${lead.name || "—"}</strong> · ${lead.phone || "—"} · ${lead.email || "—"}</p>
      <p>From <strong>${lead.pickup?.postcode || "—"}</strong> (${lead.pickup?.size || lead.pickup?.type || "—"})
         → <strong>${lead.delivery?.postcode || "—"}</strong> (${lead.delivery?.size || lead.delivery?.type || "—"})</p>
      <p>Distance: ${miles ?? "—"} mi · Move date: ${lead.moveDate || "flexible"}</p>
      <table style="border-collapse:collapse;border:1px solid #e6ebf3;margin-top:8px">${rows}
        <tr><td style="padding:6px 10px;font-weight:bold;border-top:1px solid #e6ebf3">Estimated total</td>
            <td style="padding:6px 10px;text-align:right;font-weight:bold;border-top:1px solid #e6ebf3">£${quote}</td></tr>
      </table>
    </div>`;

  const send = (payload) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => r.ok).catch(() => false);

  const results = [];
  results.push(await send({ from, to, subject: `New quote £${quote} — ${lead.name || "Website lead"}`, html: leadHtml }));
  if (lead.email) {
    const custHtml = `<div style="font-family:Arial,sans-serif;color:#040542"><h2>Thanks${lead.name ? `, ${lead.name}` : ""}! 🚐</h2>
      <p>Your Van Hero quote request has been received. Your estimated guide price is <strong>£${quote}</strong>.</p>
      <p>A Van Hero will be in touch shortly to confirm the details. Need us sooner? Call <strong>+44 7847 117933</strong>.</p></div>`;
    results.push(await send({ from, to: lead.email, subject: "Your Van Hero quote has been booked", html: custHtml }));
  }
  return { sent: results.some(Boolean) };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { pickup = {}, delivery = {}, inventory = {}, contact = {}, moveDate = "", mode = "quote" } = body;
    const extras = body.extras || body.packing || [];

    const d = await drivingMiles(pickup.postcode, delivery.postcode);
    const size = pickup.size || delivery.size || "2 Bed House";
    const { total, breakdown } = computePrice({ size, inventory, miles: d.miles, pickup, delivery, extras });

    // "preview" mode just returns the price + distance (no email); "quote" mode (final submit) emails the lead.
    let emailed = false;
    if (mode === "quote") {
      const lead = { ...contact, pickup, delivery, moveDate, miles: d.miles };
      const res = await sendEmails({ lead, quote: total, breakdown, miles: d.miles });
      emailed = res.sent;
    }

    return Response.json({ ok: true, quote: total, miles: d.miles, breakdown, emailed });
  } catch (e) {
    return Response.json({ ok: false, error: "Could not calculate quote." }, { status: 400 });
  }
}
