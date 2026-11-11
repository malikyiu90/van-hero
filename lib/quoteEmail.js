import { INVENTORY } from "@/lib/inventory";

// VH-YYMMDD-XXXX  e.g. VH-261107-7F3Q
// Short enough to read over the phone, unique enough to search the inbox for.
export function makeReference() {
  const d = new Date();
  const ymd = [d.getFullYear() % 100, d.getMonth() + 1, d.getDate()]
    .map((n) => String(n).padStart(2, "0")).join("");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VH-${ymd}-${rand}`;
}

const ITEM_LABELS = Object.fromEntries(
  INVENTORY.flatMap((room) => room.items.map((it) => [it.id, it.label]))
);

export const gbp = (n) => Number(n || 0).toFixed(2);

export const esc = (v) =>
  String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function describeProperty(p = {}) {
  return [
    p.size || p.type,
    p.floor && p.floor !== "Ground floor" ? p.floor : null,
    p.type === "Flat" ? (p.lift ? "lift available" : "no lift") : null,
  ].filter(Boolean).join(" \u00b7 ") || "\u2014";
}

const fact = (k, v) =>
  `<tr><td style="padding:4px 10px;color:#606d9a">${esc(k)}</td><td style="padding:4px 10px;font-weight:bold">${esc(v)}</td></tr>`;

const shell = (inner) =>
  `<div style="font-family:Arial,Helvetica,sans-serif;color:#040542;max-width:640px">${inner}</div>`;

/* ---------------- office / lead email ---------------- */
export function officeHtml({ reference, quote, lead, miles, breakdown = [], inventory = {}, extras = [], notes, otherItems, kind = "quote" }) {
  const rows = breakdown.map((b) =>
    `<tr><td style="padding:5px 10px;border-bottom:1px solid #eef1f6">${esc(b.label)}</td><td style="padding:5px 10px;text-align:right;border-bottom:1px solid #eef1f6">&pound;${gbp(b.amount)}</td></tr>`).join("");

  const itemRows = Object.entries(inventory)
    .filter(([, q]) => Number(q) > 0)
    .map(([id, q]) => `<tr><td style="padding:4px 10px">${esc(ITEM_LABELS[id] || id)}</td><td style="padding:4px 10px;text-align:right">&times;${Number(q)}</td></tr>`).join("");

  const title = kind === "enquiry" ? "NEW ENQUIRY" : "NEW QUOTE REQUEST";

  return shell(`
    <div style="background:#040542;color:#fff;padding:16px 20px;border-radius:12px 12px 0 0">
      <div style="font-size:13px;letter-spacing:.08em;color:#ffd41c">${title}</div>
      <div style="font-size:26px;font-weight:bold;margin-top:4px">${esc(reference)}</div>
      ${quote != null ? `<div style="font-size:20px;margin-top:6px">Estimated total &pound;${gbp(quote)}</div>` : ""}
    </div>
    <div style="border:1px solid #e6ebf3;border-top:0;border-radius:0 0 12px 12px;padding:16px 20px">
      <h3 style="margin:0 0 6px">Customer</h3>
      <table style="border-collapse:collapse;width:100%">
        ${fact("Name", lead.name || "\u2014")}
        ${fact("Phone", lead.phone || "\u2014")}
        ${fact("Email", lead.email || "\u2014")}
        ${lead.service ? fact("Enquiry from", lead.service) : ""}
      </table>

      <h3 style="margin:16px 0 6px">Move</h3>
      <table style="border-collapse:collapse;width:100%">
        ${fact("Collection", `${(lead.pickup?.postcode || "\u2014").toUpperCase()} \u2014 ${describeProperty(lead.pickup)}`)}
        ${fact("Delivery", `${(lead.delivery?.postcode || "\u2014").toUpperCase()} \u2014 ${describeProperty(lead.delivery)}`)}
        ${miles != null
          ? fact("Distance", `${miles} miles`)
          : `<tr><td style="padding:4px 10px;color:#606d9a">Distance</td><td style="padding:4px 10px;font-weight:bold;color:#9a0000">NOT COUNTED &mdash; postcode not recognised, no mileage charged</td></tr>`}
        ${fact("Move date", lead.moveDate || "flexible")}
        ${quote != null ? fact("Hours / crew", `${lead.hours || 0} h \u00d7 ${lead.crew || 0} crew`) : ""}
        ${extras.length ? fact("Add-ons", extras.join(", ")) : ""}
      </table>

      ${notes ? `<h3 style="margin:16px 0 6px">What they&rsquo;re moving (their words)</h3>
        <div style="background:#f7f9fc;border:1px solid #e6ebf3;border-radius:8px;padding:10px 12px;white-space:pre-wrap">${esc(notes)}</div>` : ""}

      ${otherItems ? `<h3 style="margin:16px 0 6px">Other items (not on our list)</h3>
        <div style="background:#fff8e1;border:1px solid #ffd41c;border-radius:8px;padding:10px 12px;white-space:pre-wrap">${esc(otherItems)}</div>` : ""}

      ${itemRows ? `<h3 style="margin:16px 0 6px">Inventory</h3>
        <table style="border-collapse:collapse;width:100%;border:1px solid #e6ebf3">${itemRows}</table>` : ""}

      ${rows ? `<h3 style="margin:16px 0 6px">Price breakdown</h3>
        <table style="border-collapse:collapse;width:100%;border:1px solid #e6ebf3">${rows}
          <tr><td style="padding:8px 10px;font-weight:bold">Estimated total</td><td style="padding:8px 10px;text-align:right;font-weight:bold">&pound;${gbp(quote)}</td></tr>
        </table>` : ""}

      <p style="font-size:12px;color:#606d9a;margin-top:14px">Estimating tool only &mdash; confirm heavy items, loft/stairs access, parking and long carries before issuing the final quote.</p>
    </div>`);
}

/* ---------------- customer confirmation ---------------- */
export function customerHtml({ reference, quote, lead, miles, breakdown = [], kind = "quote" }) {
  const rows = breakdown.map((b) =>
    `<tr><td style="padding:5px 10px;border-bottom:1px solid #eef1f6">${esc(b.label)}</td><td style="padding:5px 10px;text-align:right;border-bottom:1px solid #eef1f6">&pound;${gbp(b.amount)}</td></tr>`).join("");

  return shell(`
    <div style="background:#040542;color:#fff;padding:18px 20px;border-radius:12px 12px 0 0">
      <div style="font-size:22px;font-weight:bold">Thanks${lead.name ? `, ${esc(lead.name)}` : ""}!</div>
      <div style="margin-top:8px">Your reference is
        <span style="background:#ffd41c;color:#040542;padding:3px 9px;border-radius:6px;font-weight:bold">${esc(reference)}</span>
      </div>
    </div>
    <div style="border:1px solid #e6ebf3;border-top:0;border-radius:0 0 12px 12px;padding:16px 20px">
      ${quote != null
        ? `<p>Your estimated guide price is <strong style="font-size:20px">&pound;${gbp(quote)}</strong>.</p>`
        : `<p>We&rsquo;ve received your enquiry and a Van Hero will be in touch shortly with your price.</p>`}
      <table style="border-collapse:collapse;width:100%">
        ${lead.pickup?.postcode ? fact("Collection", String(lead.pickup.postcode).toUpperCase()) : ""}
        ${lead.delivery?.postcode ? fact("Delivery", String(lead.delivery.postcode).toUpperCase()) : ""}
        ${miles != null ? fact("Distance", `${miles} miles`) : ""}
        ${fact("Move date", lead.moveDate || "flexible")}
      </table>
      ${quote != null ? `<p style="margin-top:12px;color:#606d9a;font-size:13px">Includes mileage, handling and VAT.</p>` : ""}
      <p style="margin-top:14px">Please quote <strong>${esc(reference)}</strong> when you call us on <strong>+44 7847 117933</strong>.</p>
      <p style="font-size:12px;color:#606d9a">This is a guide price based on what you told us. The final price is confirmed once we check access, heavy items and parking.</p>
    </div>`);
}
