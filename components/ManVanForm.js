"use client";
import { useState } from "react";

export default function ManVanForm() {
  const [sent, setSent] = useState(false);
  const field = "w-full px-3.5 py-2.5 border border-line rounded-xl bg-white text-ink text-[.92rem] focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-brand-yellow transition";
  const lab = "block text-[.82rem] font-semibold text-ink mb-1.5";

  if (sent) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-[0_24px_50px_-30px_rgba(0,0,0,.5)] border border-line text-center">
        <div className="text-3xl mb-2">✅</div>
        <h3 className="font-display font-bold text-ink text-[1.2rem]">Thanks — request received!</h3>
        <p className="text-muted text-[.9rem] mt-1.5">A Van Hero will get back to you shortly with your free quote.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_24px_50px_-30px_rgba(0,0,0,.5)] border border-line">
      <span className="pill text-[.68rem]">★ Man with Van</span>
      <h3 className="font-display font-bold text-brand-blue text-[1.3rem] mt-3 leading-tight">Help for any small move, Starts From £25.</h3>
      <p className="text-muted text-[.86rem] mt-1 mb-4">Single items to half-house moves.</p>
      <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <div><label className={lab}>Full Name</label><input className={field} placeholder="Enter your name" required /></div>
        <div><label className={lab}>Phone Number (UK)</label><input className={field} placeholder="07123 456 789" inputMode="tel" required /><span className="text-[.72rem] text-muted">UK mobile or landline</span></div>
        <div><label className={lab}>Email</label><input type="email" className={field} placeholder="john@example.com" required /></div>
        <div><label className={lab}>Postcode</label><input className={field} placeholder="CV1 1AA" required /></div>
        <div><label className={lab}>What do you need moved?</label><textarea rows={3} className={field} placeholder="e.g. sofa from CV1 to CV3, IKEA pickup, single mattress…" /></div>
        <button type="submit" className="bg-brand-yellow text-ink font-display font-bold px-6 py-3 rounded-xl hover:-translate-y-0.5 transition">Get My Free Quote →</button>
        <p className="text-[.72rem] text-muted text-center">By submitting you agree to be contacted by Van Hero about your enquiry.</p>
      </form>
    </div>
  );
}
