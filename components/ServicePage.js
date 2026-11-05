import Image from "next/image";
import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import ManVanForm from "@/components/ManVanForm";
import { posts, areas } from "@/lib/data";

const DEFAULT_STEPS = [
  { n: "01", title: "Get a Quote", text: "Fill in our quick form or give us a call. Tell us what you're moving and where it's going, and we'll provide a tailored, no-obligation quote." },
  { n: "02", title: "Pick Your Slot", text: "Pick a date and time that works for you. We offer flexible appointments, including same-day and weekend availability where possible." },
  { n: "03", title: "Move Complete", text: "Our experienced team arrives on time, carefully handles your belongings, and gets the job done with no stress and no hassle." },
];
const DEFAULT_TRUST = ["Same Day Available", "Rated 4.9/5 by Customers", "On Time, Every Time", "Experienced Local Crew"];

export default function ServicePage({ data }) {
  const {
    label, breadcrumbParent = "Services", pill, title, intro, heroImage, heroBadge = "Same Day Available",
    sectionHeading, sectionImage, sectionParas = [], features = [],
    pricingIntro, pricingCols = ["Move Size", "Start From", "Van Type", "Crew"], pricing,
    faqHeading, faqIntro = "Everything you need to know. Still got a question? Just call or message us.", faqs = [],
    form = {}, steps = DEFAULT_STEPS, trust = DEFAULT_TRUST, tipsHeading = "Moving & Packing Tips",
  } = data;

  return (
    <main>
      <Nav />

      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <span>{breadcrumbParent}</span> / <span className="text-ink font-semibold">{label}</span>
        </div>
      </div>

      {/* hero */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-wrap px-5 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="pill">{pill}</span>
            <h1 className="font-display font-black text-ink text-[clamp(2.3rem,5.5vw,3.5rem)] tracking-[-0.02em] mt-4">{title}</h1>
            <p className="mt-4 text-[1.02rem] text-muted max-w-[52ch] leading-relaxed">{intro}</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#quote" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-ink font-display font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition">Get a Free Quote →</a>
              <a href="tel:+447847117933" className="inline-flex items-center justify-center gap-2 border-2 border-ink text-ink font-display font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition">📞 Call +44 7847 117933</a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_-34px_rgba(11,27,74,.5)] aspect-[4/3]">
            <Image src={heroImage} alt={title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" priority />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-brand-blue text-white text-[.7rem] font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg shadow">🛡 {heroBadge}</span>
          </div>
        </div>
      </section>

      {/* main + sticky form */}
      <section className="bg-softblue py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5 grid lg:grid-cols-[1.6fr_1fr] gap-10">
          <div>
            <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em]">{sectionHeading}</h2>
            <div className="w-16 h-1 bg-brand-blue rounded mt-3 mb-6" />
            {sectionImage && (
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-6">
                <Image src={sectionImage} alt={sectionHeading} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
              </div>
            )}
            {sectionParas.map((p, i) => <p key={i} className="text-muted leading-relaxed mt-3 first:mt-0">{p}</p>)}

            {features.length > 0 && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
                {features.map((f) => (
                  <div key={f.title} className="bg-white border border-line rounded-2xl p-5">
                    <div className="w-11 h-11 rounded-xl bg-softblue grid place-items-center text-[1.3rem] mb-3">{f.icon}</div>
                    <h3 className="font-display font-bold text-ink text-[1.05rem]">{f.title}</h3>
                    <p className="text-[.85rem] text-muted mt-1.5 leading-relaxed">{f.text}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 bg-navy rounded-2xl px-6 py-5 flex flex-wrap gap-x-8 gap-y-3 justify-center text-white text-[.9rem] font-semibold">
              {trust.map((t) => <span key={t} className="inline-flex items-center gap-2"><span className="text-brand-yellow">✓</span> {t}</span>)}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-max flex flex-col gap-4" id="quote">
            <ManVanForm {...form} />
            <div className="bg-navy rounded-2xl p-5 flex flex-col gap-3">
              <a href="tel:+447847117933" className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-display font-bold px-5 py-3 rounded-xl hover:bg-white/10 transition">📞 Call +44 7847 117933</a>
              <a href="https://wa.me/447847117933" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp text-[#05371a] font-display font-bold px-5 py-3 rounded-xl hover:-translate-y-0.5 transition">💬 WhatsApp Us</a>
            </div>
            <div className="bg-white border border-line rounded-2xl p-4 flex items-center gap-3">
              <span className="text-brand-yellow text-2xl">★</span>
              <div><div className="font-display font-bold text-ink">4.9 Stars</div><div className="text-[.82rem] text-muted">Based on 150+ reviews</div></div>
            </div>
            <div className="bg-white border border-line rounded-2xl p-5">
              <div className="font-display font-bold text-ink mb-3">Areas Covered</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {areas.map((a) => <span key={a} className="flex items-center gap-1.5 text-[.85rem] text-ink"><span className="text-brand-blue text-[.7rem]">➤</span> {a}</span>)}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* pricing (optional) */}
      {pricing && pricing.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-wrap px-5">
            <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em]">Transparent Pricing Based on Your Move</h2>
            <div className="w-16 h-1 bg-brand-blue rounded mt-3 mb-5" />
            {pricingIntro && <p className="text-muted max-w-[70ch] leading-relaxed">{pricingIntro}</p>}
            <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[560px] text-left">
                <thead>
                  <tr className="bg-brand-blue text-white text-[.8rem] uppercase tracking-wide">
                    {pricingCols.map((c) => <th key={c} className="px-5 py-4 font-bold">{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {pricing.map((row, i) => (
                    <tr key={i} className={i % 2 ? "bg-soft" : "bg-white"}>
                      {row.map((cell, j) => (
                        <td key={j} className="px-5 py-4">
                          {j === 0 ? <span className="font-display font-bold text-ink">{cell}</span>
                            : j === 1 ? <span className="font-display font-black text-brand-blue text-[1.6rem] border-b-2 border-brand-yellow pb-0.5">{cell}</span>
                              : <span className="text-muted">{cell}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* how it works */}
      <section className="pb-16 md:pb-20 pt-4">
        <div className="mx-auto max-w-wrap px-5">
          <div className="bg-softblue rounded-3xl px-6 py-12 md:py-14">
            <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.5rem)] text-center">How It Works</h2>
            <div className="grid sm:grid-cols-3 gap-8 mt-10 max-w-[900px] mx-auto">
              {steps.map((s) => (
                <div key={s.n} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-brand-yellow text-ink font-display font-black text-[1.3rem] grid place-items-center ring-8 ring-white">{s.n}</div>
                  <h3 className="font-display font-bold text-ink text-[1.15rem]">{s.title}</h3>
                  <p className="text-[.9rem] text-muted mt-2 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-softblue py-16 md:py-20">
          <div className="mx-auto max-w-wrap px-5">
            <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.5rem)]">{faqHeading}</h2>
            <p className="text-muted mt-2">{faqIntro}</p>
            <div className="mt-8 max-w-[760px] flex flex-col gap-2">
              {faqs.map((f, i) => (
                <details key={i} className="group bg-white rounded-xl border border-line px-5 py-4">
                  <summary className="flex items-center gap-3 cursor-pointer list-none font-display font-bold text-ink">
                    <span className="text-muted2 text-[.9rem]">{String(i + 1).padStart(2, "0")}.</span>
                    <span className="flex-1">{f.q}</span>
                    <span className="text-brand-blue text-xl transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-muted text-[.92rem] mt-3 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* tips */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5">
          <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.5rem)] text-center">{tipsHeading}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {posts.map((p) => (
              <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer" className="group bg-white border border-line rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-30px_rgba(3,5,65,.45)] transition duration-300">
                <div className="relative h-[190px] overflow-hidden">
                  <Image src={p.img} alt={p.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-ink text-[1.1rem] leading-snug">{p.title}</h3>
                  <p className="text-[.9rem] text-muted mt-2 leading-relaxed">{p.excerpt}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-2 bg-brand-blue text-white rounded-lg text-[.8rem] px-4 py-2 font-display font-bold w-max">➜ Read Guide</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
