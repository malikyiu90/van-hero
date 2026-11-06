import { esc } from "@/lib/quoteEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// VH-APP-YYMMDD-XXXX so driver applications are easy to spot in the inbox
function makeReference() {
  const d = new Date();
  const ymd = [d.getFullYear() % 100, d.getMonth() + 1, d.getDate()]
    .map((n) => String(n).padStart(2, "0")).join("");
  return `VH-APP-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

const row = (k, v) =>
  `<tr><td style="padding:5px 10px;color:#606d9a;white-space:nowrap">${esc(k)}</td><td style="padding:5px 10px;font-weight:bold">${esc(v || "—")}</td></tr>`;

export async function POST(req) {
  try {
    const b = await req.json();

    const s = (v, max = 200) => String(v ?? "").trim().slice(0, max);
    const a = {
      role: s(b.role, 60), name: s(b.name, 120), phone: s(b.phone, 40),
      email: s(b.email, 160), postcode: s(b.postcode, 16),
      licence: s(b.licence, 40), years: s(b.years, 4),
      rightToWork: s(b.rightToWork, 10), nearCoventry: s(b.nearCoventry, 10),
      experience: s(b.experience, 20), languages: s(b.languages, 160),
    };

    if (!a.name || !a.phone || !a.email) {
      return Response.json({ ok: false, error: "Name, phone and email are required." }, { status: 400 });
    }
    if (b.confirm !== true) {
      return Response.json({ ok: false, error: "Please confirm your details are accurate." }, { status: 400 });
    }

    const reference = makeReference();

    const key = process.env.RESEND_API_KEY;
    const to = process.env.QUOTE_TO_EMAIL || "Vmtofficials@gmail.com";
    const from = process.env.QUOTE_FROM_EMAIL || "Van Hero Quotes <quotes@vanhero.online>";
    let emailed = false;

    if (key) {
      const officeHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#040542;max-width:640px">
        <div style="background:#040542;color:#fff;padding:16px 20px;border-radius:12px 12px 0 0">
          <div style="font-size:13px;letter-spacing:.08em;color:#ffd41c">NEW DRIVER APPLICATION</div>
          <div style="font-size:24px;font-weight:bold;margin-top:4px">${esc(reference)}</div>
          <div style="margin-top:6px">${esc(a.role || "No role selected")}</div>
        </div>
        <div style="border:1px solid #e6ebf3;border-top:0;border-radius:0 0 12px 12px;padding:16px 20px">
          <h3 style="margin:0 0 6px">Applicant</h3>
          <table style="border-collapse:collapse;width:100%">
            ${row("Name", a.name)}${row("Phone", a.phone)}${row("Email", a.email)}${row("Postcode", a.postcode.toUpperCase())}
          </table>
          <h3 style="margin:16px 0 6px">Eligibility</h3>
          <table style="border-collapse:collapse;width:100%">
            ${row("Licence number", a.licence)}
            ${row("Years clean driving", a.years)}
            ${row("Right to work in UK", a.rightToWork)}
            ${row("Lives near Coventry", a.nearCoventry)}
            ${row("Removals experience", a.experience)}
            ${row("Languages", a.languages)}
          </table>
          <p style="font-size:12px;color:#606d9a;margin-top:14px">Applicant confirmed the information is true and accurate. Documents (licence, insurance, vehicle photos) still need collecting.</p>
        </div>
      </div>`;

      const applicantHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#040542;max-width:640px">
        <div style="background:#040542;color:#fff;padding:18px 20px;border-radius:12px 12px 0 0">
          <div style="font-size:22px;font-weight:bold">Thanks, ${esc(a.name)}!</div>
          <div style="margin-top:8px">Your application reference is
            <span style="background:#ffd41c;color:#040542;padding:3px 9px;border-radius:6px;font-weight:bold">${esc(reference)}</span>
          </div>
        </div>
        <div style="border:1px solid #e6ebf3;border-top:0;border-radius:0 0 12px 12px;padding:16px 20px">
          <p>We&rsquo;ve received your application to drive with Van Hero as <strong>${esc(a.role || "a driver")}</strong>.</p>
          <p>Our driver coordinator will review your details and be in touch <strong>within 48 hours</strong> for a quick document check and a chat.</p>
          <p style="margin-top:14px">Any questions? Call <strong>+44 7847 117933</strong> and quote <strong>${esc(reference)}</strong>.</p>
        </div>
      </div>`;

      const send = (payload) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).then((r) => r.ok).catch(() => false);

      const office = await send({
        from, to, reply_to: a.email || undefined,
        subject: `${reference} — driver application — ${a.name}`,
        html: officeHtml,
      });
      const applicant = a.email
        ? await send({ from, to: a.email, subject: `Your Van Hero application ${reference}`, html: applicantHtml })
        : false;
      emailed = office || applicant;
    }

    return Response.json({ ok: true, reference, emailed });
  } catch {
    return Response.json({ ok: false, error: "Could not submit your application." }, { status: 400 });
  }
}
