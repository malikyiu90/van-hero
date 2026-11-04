"use client";
import { useMemo, useState } from "react";

const typeBase = { house: 420, flat: 240, studio: 160, storage: 120, flatshare: 200 };

function postcodeMiles(a, b) {
  const na = parseInt((a.match(/\d+/) || [0])[0], 10);
  const nb = parseInt((b.match(/\d+/) || [0])[0], 10);
  if (!a || !b) return 0;
  return Math.min(70, 5 + Math.abs(na - nb) * 2);
}
const gbp = (n) => "£" + Math.round(n);

const propTypes = [
  { v: "", label: "Select property type" },
  { v: "house", label: "House" },
  { v: "flat", label: "Flat" },
  { v: "studio", label: "Studio" },
  { v: "storage", label: "Storage Unit" },
  { v: "flatshare", label: "Flatshare" },
];

export default function QuoteSection() {
  const [f, setF] = useState({
    fromPc: "", fromType: "", toPc: "", toType: "", date: "", noDate: false, terms: false,
  });
  const set = (k) => (e) =>
    setF((s) => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const estimate = useMemo(() => {
    if (!f.fromType) return null;
    const base = typeBase[f.fromType] || 240;
    const miles = postcodeMiles(f.fromPc, f.toPc);
    return base + miles * 3;
  }, [f.fromType, f.fromPc, f.toPc]);

  const field =
    "w-full px-3.5 py-2.5 border border-line rounded-xl bg-white text-ink text-[.92rem] focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition";
  const lab = "block text-[.8rem] font-semibold text-ink mb-1.5";
  const group = "bg-soft rounded-2xl p-4 border border-line";

  return (
    <section id="quote" className="bg-navy py-16 md:py-24">
      <div className="mx-auto max-w-wrap px-5 grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-14 items-start">
        {/* left */}
        <div className="lg:pt-6">
          <h2 className="font-display font-black text-white text-[clamp(2rem,4.5vw,3rem)] tracking-[-0.02em] leading-[1.05]">
            Get Your Free Quote — <span className="text-brand-yellow">No Strings</span>
          </h2>
          <div className="mt-7 flex flex-col gap-3 max-w-[300px]">
            <a href="tel:+447847117933" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-ink font-display font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition">
              📞 Call +44 7847 117933
            </a>
            <a href="https://wa.me/447847117933" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp text-[#05371a] font-display font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition">
              💬 WhatsApp us
            </a>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            {["Fixed or hourly pricing", "Reliable, local Coventry crew", "Fully insured & licensed"].map((t) => (
              <div key={t} className="flex items-center gap-3 text-white font-semibold text-[.95rem]">
                <span className="w-7 h-7 rounded-full bg-brand-yellow/20 text-brand-yellow grid place-items-center text-[.85rem]">✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* form card */}
        <div className="bg-white rounded-[22px] p-6 md:p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)]">
          <h3 className="font-display font-bold text-ink text-[1.5rem]">See Your Move Cost in Under a Minute</h3>
          <p className="text-[.9rem] text-muted mt-1.5 mb-6">
            Real-time pricing built by a real removal company. Not a lead-farm.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className={group}>
              <div className="font-display font-bold text-ink text-[.95rem] mb-3">Moving from</div>
              <label className={lab} htmlFor="fromPc">Postcode *</label>
              <input id="fromPc" className={field} placeholder="e.g. CV1 2WT" value={f.fromPc} onChange={set("fromPc")} />
              <label className={`${lab} mt-3`} htmlFor="fromType">Property type *</label>
              <select id="fromType" className={field} value={f.fromType} onChange={set("fromType")}>
                {propTypes.map((o) => <option key={o.label} value={o.v} disabled={o.v === ""}>{o.label}</option>)}
              </select>
            </div>

            <div className={group}>
              <div className="font-display font-bold text-ink text-[.95rem] mb-3">Moving to</div>
              <label className={lab} htmlFor="toPc">Postcode *</label>
              <input id="toPc" className={field} placeholder="e.g. B1 1BB" value={f.toPc} onChange={set("toPc")} />
              <label className={`${lab} mt-3`} htmlFor="toType">Property type *</label>
              <select id="toType" className={field} value={f.toType} onChange={set("toType")}>
                {propTypes.map((o) => <option key={o.label} value={o.v} disabled={o.v === ""}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className={lab} htmlFor="date">Move date</label>
            <input id="date" type="date" className={field} value={f.date} onChange={set("date")} disabled={f.noDate} />
            <label className="mt-2 flex items-center gap-2 text-[.88rem] text-muted font-medium">
              <input type="checkbox" checked={f.noDate} onChange={set("noDate")} className="accent-brand-blue w-4 h-4" />
              I don&apos;t have a move date yet
            </label>
          </div>

          <label className="mt-4 flex items-start gap-2 text-[.88rem] text-muted font-medium">
            <input type="checkbox" checked={f.terms} onChange={set("terms")} className="accent-brand-blue w-4 h-4 mt-0.5" />
            I agree to the <a href="#" className="text-brand-blue font-semibold underline">Terms &amp; Conditions</a> of VanHero
          </label>

          {/* live estimate */}
          <div className="mt-5 pt-5 border-t border-dashed border-line flex items-center justify-between">
            <div>
              <div className="text-[.78rem] text-muted uppercase tracking-wide font-bold">Estimated guide price</div>
              <div className="text-[.72rem] text-muted mt-0.5">
                {estimate ? `Typical range ${gbp(estimate * 0.9)}–${gbp(estimate * 1.12)}` : "Fill in the details above"}
              </div>
            </div>
            <div className="font-display font-black text-ink text-[2rem] tabular-nums">
              {estimate ? gbp(estimate) : "£—"}
            </div>
          </div>

          <button
            type="button"
            disabled={!f.terms || !f.fromPc || !f.fromType}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-brand-yellow text-ink font-display font-bold px-6 py-3.5 rounded-xl transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        </div>
      </div>
    </section>
  );
}
