import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ManVanForm from "@/components/ManVanForm";

export const metadata = {
  title: "Become a Hero — Drive with Van Hero",
  description: "Join the Van Hero fleet. Flexible work, local jobs and fair, reliable pay for man-and-van drivers and movers across Coventry and Warwickshire.",
};

const perks = [
  { icon: "💷", title: "Fair, Reliable Pay", text: "Transparent rates and prompt payment — you always know what you'll earn." },
  { icon: "🗓️", title: "Flexible Work", text: "Pick the jobs and hours that suit you. Full-time, part-time or weekends." },
  { icon: "📍", title: "Local Jobs", text: "Mostly Coventry and Warwickshire work, with longer runs when you want them." },
  { icon: "📈", title: "Steady Demand", text: "A busy, growing book of removals, courier and clearance jobs all year round." },
  { icon: "🤝", title: "Real Support", text: "A friendly local team behind you, not a faceless app or call centre." },
  { icon: "⭐", title: "Build Your Reputation", text: "Great work earns great reviews — and more of the jobs you want." },
];

const requirements = [
  "A reliable van (or you drive for us) in good condition",
  "A full UK driving licence",
  "Goods-in-transit and public liability insurance",
  "A friendly, professional, can-do attitude",
  "Right to work in the UK",
];

export default function BecomeHeroPage() {
  return (
    <main>
      <Nav />
      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <span className="text-ink font-semibold">Become Hero</span>
        </div>
      </div>

      <section className="bg-navy py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5 text-center max-w-[680px]">
          <span className="pill">Join the Fleet</span>
          <h1 className="font-display font-black text-white text-[clamp(2.2rem,5vw,3.4rem)] tracking-[-0.02em] mt-4">Become a Hero</h1>
          <p className="text-white/75 mt-3 text-[1.05rem]">Drive with Van Hero and get access to a steady stream of local removals, courier and clearance work — with flexible hours, fair pay and a team that has your back.</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5">
          <div className="max-w-[560px] mb-10">
            <span className="pill">Why Drive With Us</span>
            <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.02em] mt-4">Work that works for you</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((p) => (
              <div key={p.title} className="bg-white border border-line rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-softblue grid place-items-center text-[1.4rem] mb-3">{p.icon}</div>
                <h3 className="font-display font-bold text-ink text-[1.15rem]">{p.title}</h3>
                <p className="text-muted text-[.9rem] mt-2 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-softblue py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div>
            <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.4rem)] tracking-[-0.02em]">What You'll Need</h2>
            <div className="w-16 h-1 bg-brand-blue rounded mt-3 mb-6" />
            <ul className="flex flex-col gap-3">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-ink font-semibold">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-dot/15 text-dot grid place-items-center text-[.8rem] mt-0.5">✓</span>
                  <span className="font-body font-normal text-[.95rem]">{r}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted mt-6 text-[.95rem] leading-relaxed">Sound like you? Send us your details and we'll be in touch about getting you on the road with Van Hero.</p>
          </div>
          <div className="lg:sticky lg:top-24">
            <ManVanForm pill="★ Become a Hero" title="Apply to Drive with Us" subtitle="Tell us a little about you and your van." />
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
