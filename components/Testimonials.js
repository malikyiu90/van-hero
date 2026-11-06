import { testimonials } from "@/lib/data";

function ReviewCard({ r }) {
  return (
    <article className="shrink-0 w-[320px] sm:w-[360px] bg-white rounded-2xl border border-line p-6 shadow-[0_18px_40px_-30px_rgba(0,0,0,.5)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-full grid place-items-center text-white font-bold text-[1.05rem]" style={{ background: r.color }}>
            {r.by[0]}
          </span>
          <div>
            <div className="font-semibold text-ink text-[.95rem] leading-tight">{r.by}</div>
            <div className="text-[.78rem] text-muted">{r.role} · {r.when}</div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-[#FBBC05] text-[1.05rem] leading-none">
        {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
      </div>
      <p className="mt-3 text-[.92rem] text-[#3c4043] leading-relaxed">{r.quote}</p>
    </article>
  );
}

export default function Testimonials() {
  // duplicate the list so the marquee can loop seamlessly
  const loop = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-wrap px-5 text-center mb-10">
        <span className="pill">Trusted Locally</span>
        <h2 className="font-display font-black text-ink text-[clamp(1.9rem,4.2vw,3rem)] tracking-[-0.02em] mt-4">
          Coventry Trusts Van Hero
        </h2>
      </div>

      {/* sliding carousel — 3-ish cards in view, continuous, pauses on hover */}
      <div className="marquee-wrap relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-white to-transparent" />
        <div className="flex gap-5 w-max animate-marquee">
          {loop.map((r, i) => <ReviewCard key={i} r={r} />)}
        </div>
      </div>
    </section>
  );
}
