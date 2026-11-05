import Image from "next/image";
import { ecosystem, services, moves, areas, steps, posts } from "@/lib/data";

const IMG_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

const accents = [
  { c: "#002496", tint: "#e7ecfb", fg: "#002496" }, // House Removals — blue
  { c: "#0b1b4a", tint: "#e6e8f2", fg: "#0b1b4a" }, // Office — navy
  { c: "#e0a500", tint: "#fff3cf", fg: "#8a6500" }, // Man & Van — amber
  { c: "#10b981", tint: "#d9f5ea", fg: "#0a7f58" }, // Recycling — green
  { c: "#3993d5", tint: "#e2f0fb", fg: "#1f6fa8" }, // Storage — sky
  { c: "#e0533a", tint: "#fde7e2", fg: "#b23a24" }, // Courier — coral
];

export function Ecosystem() {
  return (
    <section className="bg-soft py-16 md:py-24">
      <div className="mx-auto max-w-wrap px-5">
        <div className="max-w-[640px] mx-auto text-center mb-12">
          <Pill>Our Logistics Ecosystem</Pill>
          <h2 className="font-display font-black text-ink text-[clamp(1.9rem,4.2vw,3rem)] tracking-[-0.02em] mt-4">
            One team for every kind of move
          </h2>
          <p className="mt-3 text-[1.05rem] text-muted">
            From a single sofa to a full office relocation, every job runs through the same insured, tracked Van Hero network.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystem.map((e, i) => {
            const a = accents[i % accents.length];
            return (
              <article
                key={e.title}
                style={{ "--accent": a.c }}
                className="group relative overflow-hidden bg-white border border-line rounded-2xl p-6 flex flex-col gap-3
                           transition duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]
                           hover:shadow-[0_26px_50px_-28px_rgba(3,5,65,.4)] focus-within:-translate-y-1.5"
              >
                {/* accent rail reveals on hover */}
                <span className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r bg-[var(--accent)] opacity-0 -translate-x-1 transition duration-300 group-hover:opacity-100 group-hover:translate-x-0" />

                <div className="flex items-start justify-between gap-3">
                  <div
                    className="w-14 h-14 rounded-2xl grid place-items-center text-[1.6rem] transition duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ background: a.tint, color: a.fg }}
                  >
                    {e.icon}
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-dot/10 text-dot text-[.62rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-dot animate-softpulse" /> {e.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-ink text-[1.3rem] leading-tight mt-1">{e.title}</h3>
                <p className="text-[.92rem] text-muted leading-relaxed">{e.text}</p>

                <a
                  href={e.href}
                  className="mt-auto pt-2 inline-flex items-center gap-1.5 font-semibold text-[.88rem]"
                  style={{ color: a.fg }}
                >
                  View service
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-navy py-14 md:py-20">
      <div className="mx-auto max-w-wrap px-5">
        <div className="max-w-[56ch] mx-auto text-center mb-10">
          <Pill>What We Do</Pill>
          <h2 className="font-display font-bold text-white text-[clamp(1.8rem,4vw,2.8rem)] mt-3">Our Services</h2>
          <p className="text-white/70 mt-2 text-[1.02rem]">
            From single items to full-scale commercial relocations, we handle the heavy lifting so you don't have to.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <article key={s.title} className="group bg-white rounded-2xl overflow-hidden flex flex-col shadow-[0_18px_40px_-30px_rgba(0,0,0,.6)] hover:-translate-y-1.5 transition duration-300">
              <div className="relative h-[200px] overflow-hidden">
                <Image src={s.img} alt={s.title} fill sizes={IMG_SIZES} className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 z-10 bg-brand-yellow text-ink text-[.68rem] font-bold px-2.5 py-1 rounded-full shadow">Van Hero</span>
              </div>
              <div className="p-6 flex flex-col gap-2 flex-1">
                <h3 className="font-display font-bold text-ink text-[1.3rem]">{s.title}</h3>
                <p className="text-[.92rem] text-muted leading-relaxed">{s.text}</p>
                <a href={s.href} className="mt-auto pt-2 inline-flex items-center gap-1.5 text-brand-blue font-display font-bold text-[.82rem] uppercase tracking-wide">
                  Learn More <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RecentMoves() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-wrap px-5">
        <div className="max-w-[58ch] mb-8">
          <Pill>Recent Moves Across UK</Pill>
          <h2 className="font-display font-bold text-ink text-[clamp(1.8rem,4vw,2.8rem)] mt-3">
            A look at some of the latest removals we've completed
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {moves.map((m) => (
            <article key={m.title} className="group bg-white border border-line rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-28px_rgba(3,5,65,.45)] transition duration-300">
              <div className="h-[190px] relative overflow-hidden">
                <Image src={m.img} alt={m.title} fill sizes={IMG_SIZES} className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-white/95 text-ink text-[.62rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-dot" /> {m.when}
                </span>
                <span className="absolute bottom-3 right-3 z-10 bg-brand-yellow text-ink font-display font-extrabold px-3 py-1 rounded-lg shadow">{m.price}</span>
              </div>
              <div className="px-5 pt-4 pb-5">
                <h3 className="font-display font-bold text-ink text-[1.1rem]">{m.title}</h3>
                <div className="text-[.86rem] mt-1 flex items-center gap-1.5 text-muted">
                  <span className="text-brand-blue">📍</span> {m.loc}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-brand-yellow tracking-wider text-[.95rem]">★★★★★</div>
                  <div className="flex items-center gap-2 text-[.78rem] text-muted2">
                    <span className="w-6 h-6 rounded-full bg-softblue text-brand-blue grid place-items-center font-bold text-[.68rem]">{m.by}</span>
                    Verified
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NavArrow() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 fill-brand-blue" aria-hidden>
      <path d="M3 11l18-8-8 18-2-7-8-3z" />
    </svg>
  );
}

export function Areas() {
  return (
    <section id="areas" className="bg-softblue py-16 md:py-24">
      <div className="mx-auto max-w-wrap px-5 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* left: copy + area list */}
        <div>
          <Pill>Service Coverage</Pill>
          <h2 className="font-display font-black text-ink text-[clamp(1.9rem,4.2vw,2.9rem)] tracking-[-0.02em] mt-4">
            Local Removals Across Coventry &amp; Warwickshire
          </h2>
          <p className="mt-3 text-[1.02rem] text-muted max-w-[46ch]">
            We provide trusted house removals, office relocations and man &amp; van services throughout Coventry,
            Warwickshire and the surrounding areas. Wherever you&apos;re moving, you can count on a local team that
            knows the area and gets the job done properly.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-1">
            {areas.map((a) => (
              <a key={a} href="#quote" className="flex items-center gap-2.5 py-1.5 text-ink font-semibold text-[.92rem] hover:text-brand-blue transition">
                <NavArrow /> {a}
              </a>
            ))}
          </div>
        </div>

        {/* right: responsive live map */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_26px_60px_-30px_rgba(3,5,65,.55)] border border-white/60 aspect-[4/3] lg:aspect-auto lg:h-[460px]">
          <iframe
            title="Van Hero coverage map — Coventry & Warwickshire"
            src="https://www.google.com/maps?q=Coventry,+UK&z=10&output=embed"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href="https://www.google.com/maps/search/removals+coventry"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white text-brand-blue font-bold text-[.82rem] px-3 py-2 rounded-lg shadow hover:bg-white/90"
          >
            Open in Maps ↗
          </a>
          <div className="absolute bottom-3 right-3 bg-white rounded-xl px-4 py-3 shadow-[0_14px_30px_rgba(3,5,65,.25)] max-w-[260px]">
            <div className="flex items-center gap-1.5 text-[.76rem] font-bold text-ink">
              <span className="w-[9px] h-[9px] rounded-full bg-dot animate-softpulse" /> Live Jobs
              <span className="ml-auto text-muted text-sm leading-none">×</span>
            </div>
            <b className="block text-ink text-[.9rem] mt-1.5">David K. in Cheylesmore left a 5-star review</b>
            <small className="text-[.72rem] text-muted">35 minutes ago</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="py-16 md:py-24">
      <div className="mx-auto max-w-wrap px-5">
        <div className="max-w-[56ch] mx-auto text-center mb-12">
          <Pill>Four Simple Steps To Your New Home. We Do</Pill>
          <h2 className="font-display font-black text-ink text-[clamp(1.9rem,4.2vw,3rem)] tracking-[-0.02em] mt-4">How It Works</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand-blue" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => {
            const featured = i === 0;
            return (
              <div
                key={s.n}
                className={`relative rounded-2xl p-6 flex flex-col transition hover:-translate-y-1 ${
                  featured
                    ? "bg-brand-blue text-white shadow-[0_26px_55px_-28px_rgba(10,42,143,.9)]"
                    : "bg-white border border-line text-ink hover:shadow-[0_26px_50px_-32px_rgba(3,5,65,.4)]"
                }`}
              >
                {/* icon circle */}
                <div
                  className={`w-16 h-16 rounded-full grid place-items-center text-[1.7rem] ${
                    featured ? "bg-white/15 ring-4 ring-white/25" : "bg-softblue"
                  }`}
                >
                  {s.icon}
                </div>

                {/* dotted connector arrow to the next step (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex items-center absolute top-14 left-[72px] right-[-20px] pointer-events-none" aria-hidden>
                    <div className={`flex-1 h-px ${featured ? "bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.6)_0_6px,transparent_6px_12px)]" : "bg-[repeating-linear-gradient(90deg,#c0cae0_0_6px,transparent_6px_12px)]"}`} />
                    <span className={`text-[1.1rem] -ml-1 ${featured ? "text-white/70" : "text-[#c0cae0]"}`}>›</span>
                  </div>
                )}

                <h3 className={`font-display font-bold text-[1.18rem] mt-5 leading-tight ${featured ? "text-white" : "text-ink"}`}>
                  {String(s.n).padStart(2, "0")}. {s.title}
                </h3>
                <p className={`text-[.9rem] mt-2 leading-relaxed ${featured ? "text-white/85" : "text-muted"}`}>
                  {s.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Blog() {
  return (
    <section id="blog" className="bg-soft py-16 md:py-24">
      <div className="mx-auto max-w-wrap px-5">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div className="max-w-[58ch]">
            <Pill>Moving Wisdom</Pill>
            <h2 className="font-display font-black text-ink text-[clamp(1.9rem,4.2vw,3rem)] tracking-[-0.02em] mt-4">
              From the Van Hero blog
            </h2>
            <p className="mt-2 text-[1.02rem] text-muted">Practical, no-nonsense moving advice from the crew who does it every day.</p>
          </div>
          <a href="/blogs" className="hidden sm:inline-flex items-center gap-2 border-2 border-ink text-ink font-display font-bold px-5 py-2.5 rounded-xl hover:bg-ink hover:text-white transition">
            View all articles →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <a
              key={p.title}
              href={p.link}
              className="group bg-white border border-line rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-30px_rgba(3,5,65,.45)] transition duration-300"
            >
              <div className="relative h-[200px] overflow-hidden">
                <Image src={p.img} alt={p.title} fill sizes={IMG_SIZES} className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 z-10 bg-white/95 text-ink text-[.68rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow">{p.cat}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-[.76rem] text-muted2 font-semibold mb-2">{p.read}</div>
                <h3 className="font-display font-bold text-ink text-[1.15rem] leading-snug">{p.title}</h3>
                <p className="text-[.9rem] text-muted mt-2 leading-relaxed">{p.excerpt}</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-brand-blue font-display font-bold text-[.82rem] uppercase tracking-wide">
                  Read More <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
