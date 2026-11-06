"use client";
import { useState } from "react";

export default function ManVanForm({
  pill = "★ Man with Van",
  title = "Help for any small move, Starts From £25.",
  subtitle = "Single items to half-house moves.",
  cta = "Get My Free Quote →",
  lastLabel = "Please explain as much as you can",
  lastPlaceholder = "What are you moving? e.g. 1 double bed, 3-seater sofa, 10 boxes. Any stairs, lift, parking issues or heavy items (piano, safe)? The more detail, the more accurate your price.",
  sentTitle = "Thanks — request received!",
  sentText = "A Van Hero will get back to you shortly with your free quote.",
  service = "",
}) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", from: "", to: "", date: "", notes: "" });
  const [sent, setSent] = useState(null);      // { reference, emailed }
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const field = "w-full px-3.5 py-3 sm:py-2.5 border border-line rounded-xl bg-white text-ink text-[16px] sm:text-[.92rem] focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition";
  const lab = "block text-[.82rem] font-semibold text-ink mb-1.5";

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.phone || !form.email) { setError("Please add your name, phone and email."); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "enquiry",
          service: service || title,
          contact: { name: form.name, phone: form.phone, email: form.email },
          pickup: { postcode: form.from },
          delivery: { postcode: form.to },
          moveDate: form.date || "",
          notes: form.notes,
        }),
      });
      const j = await r.json();
      if (j.ok) setSent({ reference: j.reference, emailed: j.emailed });
      else setError(j.error || "Something went wrong. Please call us on 07847 117933.");
    } catch {
      setError("Could not reach the server. Please call us on 07847 117933.");
    }
    setBusy(false);
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-[0_24px_50px_-30px_rgba(0,0,0,.5)] border border-line text-center">
        <div className="text-3xl mb-2">✅</div>
        <h3 className="font-display font-bold text-ink text-[1.2rem]">{sentTitle}</h3>
        {sent.reference && (
          <div className="mt-3">
            <div className="text-[.78rem] uppercase tracking-wide text-muted">Your reference</div>
            <div className="inline-block mt-1 bg-brand-yellow text-ink font-display font-bold text-[1.05rem] px-4 py-1.5 rounded-lg">
              {sent.reference}
            </div>
          </div>
        )}
        <p className="text-muted text-[.9rem] mt-3">{sentText}</p>
        <p className="text-muted text-[.82rem] mt-2">Quote this reference when you call <strong className="text-ink">+44 7847 117933</strong>.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_24px_50px_-30px_rgba(0,0,0,.5)] border border-line">
      <span className="pill text-[.68rem]">{pill}</span>
      <h3 className="font-display font-bold text-brand-blue text-[1.3rem] mt-3 leading-tight">{title}</h3>
      <p className="text-muted text-[.86rem] mt-1 mb-4">{subtitle}</p>

      <form className="flex flex-col gap-3" onSubmit={submit}>
        <div><label className={lab}>Full Name *</label>
          <input className={field} placeholder="Enter your name" value={form.name} onChange={set("name")} required /></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className={lab}>Phone Number (UK) *</label>
            <input className={field} placeholder="07123 456 789" inputMode="tel" value={form.phone} onChange={set("phone")} required /></div>
          <div><label className={lab}>Email *</label>
            <input type="email" className={field} placeholder="john@example.com" value={form.email} onChange={set("email")} required /></div>
        </div>

        {/* pick-up and drop-off */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className={lab}>Collection postcode</label>
            <input className={field} placeholder="CV1 2WT" value={form.from} onChange={set("from")} /></div>
          <div><label className={lab}>Delivery postcode</label>
            <input className={field} placeholder="B1 1BB" value={form.to} onChange={set("to")} /></div>
        </div>

        <div><label className={lab}>Preferred move date</label>
          <input type="date" className={field} value={form.date} onChange={set("date")} /></div>

        <div><label className={lab}>{lastLabel}</label>
          <textarea rows={4} className={field} placeholder={lastPlaceholder} value={form.notes} onChange={set("notes")} />
          <span className="block text-[.74rem] text-muted mt-1">The more you tell us, the more accurate your price.</span>
        </div>

        {error && <p className="text-[.85rem] text-red-600">{error}</p>}

        <button type="submit" disabled={busy}
          className="bg-brand-yellow text-ink font-display font-bold px-6 py-3.5 sm:py-3 rounded-xl hover:-translate-y-0.5 active:scale-[.99] disabled:opacity-60 transition">
          {busy ? "Sending…" : cta}
        </button>
        <p className="text-[.72rem] text-muted text-center">By submitting you agree to be contacted by Van Hero about your enquiry.</p>
      </form>
    </div>
  );
}
