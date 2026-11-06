"use client";
import { useState } from "react";

const ROLES = [
  { id: "Part-Time", sub: "2–3 days/week", pay: "£200–£300" },
  { id: "Full-Time", sub: "5 days/week", pay: "£500–£600" },
  { id: "Operator (Own Van)", sub: "Manage your own van", pay: "£800–£1,000" },
];

export default function BecomeHeroForm() {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({
    role: "", name: "", phone: "", email: "", postcode: "",
    licence: "", years: "", rightToWork: "", nearCoventry: "",
    experience: "", languages: "", confirm: false,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);

  const set = (k) => (e) =>
    setF((s) => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const field =
    "w-full px-3.5 py-3 sm:py-2.5 border border-line rounded-xl bg-white text-ink text-[16px] sm:text-[.92rem] focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition";
  const lab = "block text-[.82rem] font-semibold text-ink mb-1.5";

  const step1Valid = f.role && f.name && f.phone && f.email && f.postcode;

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!f.confirm) { setError("Please confirm your details are true and accurate."); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
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
          Quote this reference when you call <strong className="text-ink">+44 7847 117933</strong>.
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
          STEP {step} OF 2
        </span>
      </div>

      <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
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
                  <input
                    type="radio"
                    name="role"
                    className="w-[18px] h-[18px] shrink-0 accent-[#ffd41c]"
                    checked={f.role === r.id}
                    onChange={() => setF((s) => ({ ...s, role: r.id }))}
                  />
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

            <button
              type="button"
              disabled={!step1Valid}
              onClick={() => setStep(2)}
              className="bg-brand-yellow text-ink font-display font-bold px-6 py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition"
            >
              Continue →
            </button>
          </>
        )}

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
                { k: "nearCoventry", q: "Do you live in or near Coventry? *", opts: ["Yes", "No"] },
                { k: "experience", q: "Removals experience *", opts: ["None", "Some", "Lots"] },
              ].map(({ k, q, opts }) => (
                <div key={k}>
                  <span className={lab}>{q}</span>
                  <div className="flex gap-2 flex-wrap">
                    {opts.map((o) => (
                      <label
                        key={o}
                        className={`px-4 py-2 rounded-xl border-2 cursor-pointer text-[.9rem] font-semibold transition ${
                          f[k] === o ? "border-brand-yellow bg-brand-yellow/20 text-ink" : "border-line text-muted hover:border-brand-yellow/50"
                        }`}
                      >
                        <input type="radio" name={k} className="sr-only" checked={f[k] === o} onChange={() => setF((s) => ({ ...s, [k]: o }))} />
                        {o}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div><label className={lab}>Languages spoken (optional)</label>
                <input className={field} placeholder="e.g. English, Urdu, Punjabi" value={f.languages} onChange={set("languages")} /></div>

              <label className="flex items-start gap-2.5 text-[.85rem] text-muted cursor-pointer">
                <input type="checkbox" className="w-[18px] h-[18px] shrink-0 mt-0.5 accent-[#ffd41c]" checked={f.confirm} onChange={set("confirm")} />
                I confirm all information provided is true and accurate.
              </label>
            </div>

            {error && <p className="text-[.85rem] text-red-300">{error}</p>}

            <div className="flex gap-2">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border-2 border-white/40 text-white font-display font-bold px-4 py-3.5 rounded-xl hover:bg-white/10 transition">
                ← Back
              </button>
              <button type="submit" disabled={busy} className="flex-[2] bg-brand-yellow text-ink font-display font-bold px-4 py-3.5 rounded-xl disabled:opacity-60 hover:-translate-y-0.5 transition">
                {busy ? "Sending…" : "Submit application →"}
              </button>
            </div>
            <p className="text-[.72rem] text-white/60 text-center">
              We&apos;ll ask for your licence, insurance and vehicle documents once we&apos;ve reviewed your application.
            </p>
          </>
        )}
      </form>
    </div>
  );
}
