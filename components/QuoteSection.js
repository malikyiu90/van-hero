import QuoteWizard from "@/components/QuoteWizard";

export default function QuoteSection() {
  return (
    <section id="quote" className="bg-navy py-16 md:py-24">
      <div className="mx-auto max-w-wrap px-5 grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-14 items-start">
        {/* left */}
        <div className="min-w-0 lg:pt-6">
          <span className="pill">No Strings Attached</span>
          <h2 className="font-display font-black text-white text-[clamp(2rem,4.5vw,3rem)] tracking-[-0.02em] leading-[1.05] mt-4">
            Get Your Free Quote — <span className="text-brand-yellow">No Strings</span>
          </h2>
          <p className="text-white/80 mt-4">
            Real-time pricing built by a real removal company. Not a lead-farm. Tell us the basics, add your items, and reveal your fixed guide price in under a minute.
          </p>
          <div className="mt-7 flex flex-col gap-3 max-w-[300px]">
            <a href="tel:+447847117933" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-ink font-display font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition">📞 Call +44 7847 117933</a>
            <a href="https://wa.me/447847117933" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp text-[#05371a] font-display font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition">💬 WhatsApp us</a>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            {["Fixed, itemised pricing", "Reliable, local crews UK-wide", "Fully insured & licensed"].map((t) => (
              <div key={t} className="flex items-center gap-3 text-white font-semibold text-[.95rem]">
                <span className="w-7 h-7 rounded-full bg-brand-yellow/20 text-brand-yellow grid place-items-center text-[.85rem]">✓</span>
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* wizard */}
        <QuoteWizard />
      </div>
    </section>
  );
}
