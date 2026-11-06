"use client";
import { useState } from "react";

const ROLES = [
  { id: "Part-Time", sub: "2–3 days/week", pay: "£200–£300" },
  { id: "Full-Time", sub: "5 days/week", pay: "£500–£600" },
  { id: "Operator (Own Van)", sub: "Manage your own van", pay: "£800–£1,000" },
];

const DOCS = [
  { k: "licence_front", label: "Driving licence — front" },
  { k: "licence_back", label: "Driving licence — back" },
  { k: "right_to_work", label: "Right to work document" },
  { k: "vehicle_photo", label: "Photo of your van" },
  { k: "insurance_hire", label: "Hire & Reward insurance" },
  { k: "insurance_goods", label: "Goods in Transit insurance" },
  { k: "insurance_public", label: "Public Liability insurance" },
  { k: "selfie", label: "Selfie holding your licence" },
];

// Vercel caps a request body at 4.5MB, so photos are shrunk in the browser
// before they ever leave the device and the running total is enforced here.
const MAX_TOTAL = 3_500_000;
const MAX_ONE = 2_000_000;
const OK_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

async function prepareFile(file) {
  if (!OK_TYPES.includes(file.type)) throw new Error(`${file.name}: use a JPG, PNG or PDF.`);

  // PDFs go through untouched; images get resized and re-encoded.
  if (file.type === "application/pdf") {
    if (file.size > MAX_ONE) throw new Error(`${file.name}: PDF is too large (max 2MB).`);
    return { name: file.name, type: file.type, dataUrl: await readAsDataURL(file) };
  }

  const dataUrl = await readAsDataURL(file);
  const img = await loadImage(dataUrl);
  const max = 1400;
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
  const out = canvas.toDataURL("image/jpeg", 0.75);
  if (out.length * 0.75 > MAX_ONE) throw new Error(`${file.name}: still too large after compressing.`);
  return { name: file.name.replace(/\.[^.]+$/, "") + ".jpg", type: "image/jpeg", dataUrl: out };
}

const readAsDataURL = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = () => rej(new Error("Could not read that file."));
    r.readAsDataURL(file);
  });

const loadImage = (src) =>
  new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => rej(new Error("Could not read that image."));
    i.src = src;
  });

const kb = (n) => (n > 1_000_000 ? `${(n / 1_000_000).toFixed(1)}MB` : `${Math.round(n / 1000)}KB`);

export default function BecomeHeroForm() {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({
    role: "", name: "", phone: "", email: "", postcode: "",
    licence: "", years: "", rightToWork: "", nearCoventry: "",
    experience: "", languages: "", confirm: false,
  });
  const [docs, setDocs] = useState({});       // key -> { name, type, dataUrl }
  const [docError, setDocError] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);

  const set = (k) => (e) =>
    setF((s) => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const field =
    "w-full px-3.5 py-3 sm:py-2.5 border border-line rounded-xl bg-white text-ink text-[16px] sm:text-[.92rem] focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition";
  const lab = "block text-[.82rem] font-semibold text-ink mb-1.5";

  const step1Valid = f.role && f.name && f.phone && f.email && f.postcode;
  const step2Valid = f.licence && f.years && f.rightToWork && f.nearCoventry && f.experience;
  const totalBytes = Object.values(docs).reduce((n, d) => n + d.dataUrl.length * 0.75, 0);

  async function pickDoc(key, file) {
    setDocError("");
    if (!file) { setDocs((d) => { const n = { ...d }; delete n[key]; return n; }); return; }
    try {
      const prepared = await prepareFile(file);
      const others = Object.entries(docs).filter(([k]) => k !== key)
        .reduce((n, [, d]) => n + d.dataUrl.length * 0.75, 0);
      if (others + prepared.dataUrl.length * 0.75 > MAX_TOTAL) {
        setDocError("That would take the documents over 3.5MB in total. Remove one, or send the rest by email after applying.");
        return;
      }
      setDocs((d) => ({ ...d, [key]: prepared }));
    } catch (err) {
      setDocError(err.message);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!f.confirm) { setError("Please confirm your details are true and accurate."); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f,
          documents: Object.entries(docs).map(([k, d]) => ({
            field: k,
            label: DOCS.find((x) => x.k === k)?.label || k,
            filename: d.name,
            type: d.type,
            content: d.dataUrl.split(",")[1],
          })),
        }),
      });
      const j = await r.json();
      if (j.ok) setDone({ reference: j.reference });
      else setError(j.error || "Something went wrong. Please call 07847 117933.");
    } catch {
      setError("Could not reach the server. Please call 07847 117933.");
    }
    setBusy(false);
  }

  if (done) {
    return (
      <div className="bg-white rounded-2xl p-7 text-center shadow-[0_30px_60px_-35px_rgba(0,0,0,.6)]">
        <div className="text-4xl">🎉</div>
        <h3 className="font-display font-bold text-ink text-[1.35rem] mt-2">Application received!</h3>
        {done.reference && (
          <>
            <div className="text-[.78rem] uppercase tracking-wide text-muted mt-3">Your reference</div>
            <div className="inline-block mt-1 bg-brand-yellow text-ink font-display font-bold text-[1.05rem] px-4 py-1.5 rounded-lg">
              {done.reference}
            </div>
          </>
        )}
        <p className="text-muted text-[.92rem] mt-3">
          Our driver coordinator will review your details and be in touch within 48 hours.
        </p>
        <p className="text-muted text-[.85rem] mt-2">
          Mention this reference when you call <strong className="text-ink">+44 7847 117933</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-navy rounded-2xl p-5 sm:p-6 shadow-[0_30px_70px_-35px_rgba(0,0,0,.8)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-bold text-white text-[1.3rem]">Become a Van Hero</h3>
          <p className="text-white/70 text-[.86rem] mt-1">Apply in a few minutes. Start earning within 48 hours.</p>
        </div>
        <span className="shrink-0 bg-brand-yellow text-ink text-[.7rem] font-bold px-2.5 py-1 rounded-md whitespace-nowrap">
          STEP {step} OF 4
        </span>
      </div>

      <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
        {/* ---------------- 1 · role + contact ---------------- */}
        {step === 1 && (
          <>
            <div className="text-white/80 text-[.84rem] font-semibold">Which role are you after?</div>
            <div className="flex flex-col gap-2">
              {ROLES.map((r) => (
                <label
                  key={r.id}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer border-2 transition ${
                    f.role === r.id ? "bg-white border-brand-yellow" : "bg-white/95 border-transparent hover:bg-white"
                  }`}
                >
                  <input type="radio" name="role" className="w-[18px] h-[18px] shrink-0 accent-[#ffd41c]"
                    checked={f.role === r.id} onChange={() => setF((s) => ({ ...s, role: r.id }))} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display font-bold text-ink text-[.98rem] leading-tight">{r.id}</span>
                    <span className="block text-[.78rem] text-muted">{r.sub}</span>
                  </span>
                  <span className="font-display font-bold text-brand-blue text-[.95rem] whitespace-nowrap">{r.pay}</span>
                </label>
              ))}
            </div>

            <div className="bg-white rounded-xl p-4 mt-1 flex flex-col gap-3">
              <div><label className={lab}>Full name *</label>
                <input className={field} placeholder="e.g. John Smith" value={f.name} onChange={set("name")} required /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className={lab}>Phone (UK) *</label>
                  <input className={field} inputMode="tel" placeholder="e.g. 07123 456789" value={f.phone} onChange={set("phone")} required /></div>
                <div><label className={lab}>Email *</label>
                  <input type="email" className={field} placeholder="e.g. you@email.com" value={f.email} onChange={set("email")} required /></div>
              </div>
              <div><label className={lab}>Postcode *</label>
                <input className={field} placeholder="e.g. CV1 2WT" value={f.postcode} onChange={set("postcode")} required /></div>
            </div>

            <button type="button" disabled={!step1Valid} onClick={() => setStep(2)}
              className="bg-brand-yellow text-ink font-display font-bold px-6 py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition">
              Continue →
            </button>
          </>
        )}

        {/* ---------------- 2 · eligibility ---------------- */}
        {step === 2 && (
          <>
            <div className="text-white/80 text-[.84rem] font-semibold">A few quick checks</div>
            <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className={lab}>UK driving licence number *</label>
                  <input className={field} placeholder="e.g. SMITH901234JS9AB" value={f.licence} onChange={set("licence")} required /></div>
                <div><label className={lab}>Years of clean driving *</label>
                  <input type="number" min="0" max="60" className={field} placeholder="e.g. 8" value={f.years} onChange={set("years")} required /></div>
              </div>

              {[
                { k: "rightToWork", q: "Do you have the right to work in the UK? *", opts: ["Yes", "No"] },
                { k: "nearCoventry", q: "Do you live in the UK? *", opts: ["Yes", "No"] },
                { k: "experience", q: "Removals experience *", opts: ["None", "Some", "Lots"] },
              ].map(({ k, q, opts }) => (
                <div key={k}>
                  <span className={lab}>{q}</span>
                  <div className="flex gap-2 flex-wrap">
                    {opts.map((o) => (
                      <label key={o}
                        className={`px-4 py-2 rounded-xl border-2 cursor-pointer text-[.9rem] font-semibold transition ${
                          f[k] === o ? "border-brand-yellow bg-brand-yellow/20 text-ink" : "border-line text-muted hover:border-brand-yellow/50"
                        }`}>
                        <input type="radio" name={k} className="sr-only" checked={f[k] === o} onChange={() => setF((s) => ({ ...s, [k]: o }))} />
                        {o}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div><label className={lab}>Languages spoken (optional)</label>
                <input className={field} placeholder="e.g. English, Urdu, Punjabi" value={f.languages} onChange={set("languages")} /></div>
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border-2 border-white/40 text-white font-display font-bold px-4 py-3.5 rounded-xl hover:bg-white/10 transition">← Back</button>
              <button type="button" disabled={!step2Valid} onClick={() => setStep(3)}
                className="flex-[2] bg-brand-yellow text-ink font-display font-bold px-4 py-3.5 rounded-xl disabled:opacity-50 hover:-translate-y-0.5 transition">Continue →</button>
            </div>
          </>
        )}

        {/* ---------------- 3 · documents ---------------- */}
        {step === 3 && (
          <>
            <div className="text-white/80 text-[.84rem] font-semibold">Documents</div>
            <p className="text-white/60 text-[.8rem] -mt-1">
              JPG, PNG or PDF. Photos are shrunk automatically. You can skip any now and send them later.
            </p>

            <div className="bg-white rounded-xl p-4 flex flex-col gap-2.5">
              {DOCS.map((d) => {
                const got = docs[d.k];
                return (
                  <div key={d.k} className="flex items-center gap-3 border-b border-line last:border-0 pb-2.5 last:pb-0">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[.88rem] text-ink leading-tight">{d.label}</span>
                      {got && <span className="block text-[.76rem] text-dot">✓ {got.name} · {kb(got.dataUrl.length * 0.75)}</span>}
                    </span>
                    {got ? (
                      <button type="button" onClick={() => pickDoc(d.k, null)}
                        className="shrink-0 text-[.8rem] font-semibold text-muted underline px-2 py-2">Remove</button>
                    ) : (
                      <label className="shrink-0 cursor-pointer bg-soft text-ink text-[.82rem] font-semibold px-3 py-2 rounded-lg hover:bg-softblue transition">
                        Choose
                        <input type="file" className="sr-only" accept="image/jpeg,image/png,image/webp,application/pdf"
                          onChange={(e) => pickDoc(d.k, e.target.files?.[0] || null)} />
                      </label>
                    )}
                  </div>
                );
              })}
              <div className="flex items-center justify-between pt-1 text-[.78rem]">
                <span className="text-muted">{Object.keys(docs).length} of {DOCS.length} attached</span>
                <span className={totalBytes > MAX_TOTAL * 0.9 ? "text-red-600 font-semibold" : "text-muted"}>
                  {kb(totalBytes)} / 3.5MB
                </span>
              </div>
            </div>

            {docError && <p className="text-[.85rem] text-red-300">{docError}</p>}

            <div className="flex gap-2">
              <button type="button" onClick={() => setStep(2)} className="flex-1 border-2 border-white/40 text-white font-display font-bold px-4 py-3.5 rounded-xl hover:bg-white/10 transition">← Back</button>
              <button type="button" onClick={() => setStep(4)} className="flex-[2] bg-brand-yellow text-ink font-display font-bold px-4 py-3.5 rounded-xl hover:-translate-y-0.5 transition">Continue →</button>
            </div>
          </>
        )}

        {/* ---------------- 4 · confirm ---------------- */}
        {step === 4 && (
          <>
            <div className="text-white/80 text-[.84rem] font-semibold">Confirm &amp; submit</div>
            <div className="bg-white rounded-xl p-4 flex flex-col gap-2 text-[.88rem]">
              {[
                ["Role", f.role], ["Name", f.name], ["Phone", f.phone], ["Email", f.email],
                ["Postcode", f.postcode.toUpperCase()], ["Licence", f.licence],
                ["Clean driving", f.years ? `${f.years} years` : ""],
                ["Right to work", f.rightToWork], ["Lives in UK", f.nearCoventry],
                ["Experience", f.experience], ["Languages", f.languages],
                ["Documents", `${Object.keys(docs).length} attached`],
              ].filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-line last:border-0 py-1">
                  <span className="text-muted">{k}</span>
                  <span className="font-semibold text-ink text-right">{v}</span>
                </div>
              ))}

              <label className="flex items-start gap-2.5 text-[.85rem] text-muted cursor-pointer mt-2">
                <input type="checkbox" className="w-[18px] h-[18px] shrink-0 mt-0.5 accent-[#ffd41c]" checked={f.confirm} onChange={set("confirm")} />
                I confirm all information provided is true and accurate.
              </label>
            </div>

            {error && <p className="text-[.85rem] text-red-300">{error}</p>}

            <div className="flex gap-2">
              <button type="button" onClick={() => setStep(3)} className="flex-1 border-2 border-white/40 text-white font-display font-bold px-4 py-3.5 rounded-xl hover:bg-white/10 transition">← Back</button>
              <button type="submit" disabled={busy} className="flex-[2] bg-brand-yellow text-ink font-display font-bold px-4 py-3.5 rounded-xl disabled:opacity-60 hover:-translate-y-0.5 transition">
                {busy ? "Sending…" : "Submit application →"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
