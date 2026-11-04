import { testimonials } from "@/lib/data";

function GoogleG({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

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
        <GoogleG />
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
        <div className="mt-4 inline-flex items-center gap-2 text-muted text-[.95rem]">
          <GoogleG className="w-5 h-5" />
          <span className="font-semibold text-ink">4.9</span>
          <span className="text-[#FBBC05]">★★★★★</span>
          <span>from 180+ Google reviews</span>
        </div>
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
