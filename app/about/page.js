import Image from "next/image";
import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

export const metadata = {
  title: "About Van Hero — UK's Trusted Local Movers",
  description: "the UK's trusted movers since 2020. Built by locals, with decades of combined logistics experience, transparent pricing and 150+ five-star reviews.",
};

const stats = [
  { n: "1,247+", l: "Moves Completed" },
  { n: "150+", l: "5-Star Reviews" },
  { n: "100+", l: "Counties Served" },
  { n: "4.9★", l: "Average Rating" },
];
const why = [
  { n: "01", title: "Expertise", text: "Decades of combined experience in high-stakes logistics and removal management." },
  { n: "02", title: "Nation-Wide", text: "Deep local knowledge ensures we take the best routes and know every neighborhood quirk." },
  { n: "03", title: "Transparent Pricing", text: "No hidden fees, no \"surprise\" overtime. Just clear, upfront quotes you can bank on." },
];
const services = [
  { icon: "🏠", title: "Moving & Furniture", text: "Seamless residential moves with full furniture protection and dismantling services included." },
  { icon: "📦", title: "Storage & Waste", text: "Secure local storage solutions and eco-friendly waste management for a clutter-free transition." },
  { icon: "🏢", title: "Business & Courier", text: "Expert office relocations and high-priority courier services for Warwickshire's business hub." },
];

export default function AboutPage() {
  return (
    <main>
      <Nav />
      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <span className="text-ink font-semibold">About</span>
        </div>
      </div>

      {/* hero */}
      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-wrap px-5 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="pill">About Us</span>
            <h1 className="font-display font-black text-ink text-[clamp(2.1rem,5vw,3.3rem)] tracking-[-0.02em] mt-4">About Van Hero — UK's Trusted Local Movers, Built by Locals</h1>
            <p className="text-muted mt-4 text-[1.05rem] leading-relaxed">the UK's trusted movers since 2020. We're a local team with decades of combined experience in logistics and removals, here to make every move quick, careful and completely stress-free. Move with Van Hero — done in a day.</p>
            <div className="mt-7 flex gap-3 flex-wrap">
              <a href="/contact" className="inline-flex items-center justify-center bg-brand-yellow text-ink font-display font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition">Get a Free Quote →</a>
              <a href="/services" className="inline-flex items-center justify-center border-2 border-ink text-ink font-display font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition">Our Services</a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_30px_60px_-34px_rgba(11,27,74,.5)]">
            <Image src="/services/manvan.webp" alt="Van Hero team and van" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-wrap px-5 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="font-display font-black text-brand-yellow text-[clamp(2rem,4vw,2.8rem)] leading-none">{s.n}</div>
              <div className="text-white/70 text-[.85rem] font-semibold mt-1.5">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* why */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5">
          <div className="max-w-[560px] mb-10">
            <span className="pill">Why Van Hero?</span>
            <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.02em] mt-4">What sets us apart</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {why.map((w) => (
              <div key={w.title} className="bg-white border border-line rounded-2xl p-6">
                <div className="font-display font-black text-brand-yellow text-[1.6rem]">{w.n}</div>
                <h3 className="font-display font-bold text-ink text-[1.2rem] mt-2">{w.title}</h3>
                <p className="text-muted text-[.92rem] mt-2 leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* comprehensive services */}
      <section className="bg-soft py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5">
          <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.02em] text-center mb-10">Comprehensive Hero Services</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white border border-line rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-softblue grid place-items-center text-[1.4rem] mb-3">{s.icon}</div>
                <h3 className="font-display font-bold text-ink text-[1.15rem]">{s.title}</h3>
                <p className="text-muted text-[.9rem] mt-2 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <blockquote className="mt-12 max-w-[680px] mx-auto text-center font-display text-[1.4rem] text-ink leading-snug">
            "We treat your belongings like they're our own family heirlooms."
            <span className="block text-[.9rem] text-muted font-body font-semibold mt-3">— Dave, Head of Logistics</span>
          </blockquote>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
