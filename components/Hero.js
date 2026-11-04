"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCountUp } from "@/lib/useCountUp";
import { liveJobs } from "@/lib/data";

function Stat({ to, suffix, label }) {
  const [ref, value] = useCountUp(to, { immediate: true });
  return (
    <div>
      <b ref={ref} className="font-display text-[1.9rem] sm:text-[2.3rem] leading-none font-black text-ink block tabular-nums">
        {value}
        {suffix && <small className="text-[1rem] ml-0.5">{suffix}</small>}
      </b>
      <span className="text-[.72rem] sm:text-[.78rem] text-muted2 font-bold">{label}</span>
    </div>
  );
}

function MapOverlays({ job, shown, onClose, variant }) {
  const desktop = variant === "desktop";
  return (
    <>
      <span className="car c1" aria-hidden>🚐</span>
      <span className="car c2" aria-hidden>🚗</span>
      <span className="pin" style={{ top: "30%", left: "52%" }} />
      <span className="pin green" style={{ top: "62%", left: "78%" }} />

      <div className={`absolute z-[4] flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-[0_8px_20px_rgba(11,27,74,.16)] ${desktop ? "top-[10%] left-[42%] right-[18px]" : "top-3 left-3 right-3"}`}>
        <span className="w-[9px] h-[9px] rounded-full bg-dot animate-softpulse" />
        <b className="font-body font-bold text-ink text-[.78rem] uppercase tracking-wide">Live in Coventry</b>
        <span className="ml-auto bg-[#eef1f6] text-muted2 text-[.66rem] font-bold px-2 py-1 rounded-md whitespace-nowrap">REF · CV-882 ›</span>
      </div>

      {shown && (
        <div className="pointer-events-auto absolute z-[5] right-3 bottom-3 bg-white rounded-xl px-4 py-3 shadow-[0_14px_30px_rgba(11,27,74,.22)] max-w-[240px]">
          <button className="absolute top-1.5 right-2 text-muted" aria-label="Close live jobs" onClick={onClose}>×</button>
          <div className="flex items-center gap-1.5 text-[.76rem] font-bold text-ink">
            <span className="w-[9px] h-[9px] rounded-full bg-dot animate-softpulse" /> Live Jobs
          </div>
          <b className="block text-ink text-[.88rem] mt-1.5">{liveJobs[job]}</b>
          <small className="text-[.72rem] text-muted">just now</small>
        </div>
      )}
    </>
  );
}

export default function Hero() {
  const [job, setJob] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setJob((j) => (j + 1) % liveJobs.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-herobg">
      {/* desktop: map embedded into the background, bleeding to the right */}
      <div className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-[58%] z-[1]">
        <Image
          src="/map.webp"
          alt="Live map of Coventry showing Van Hero coverage"
          fill
          sizes="60vw"
          className="hero-map-mask object-cover"
          style={{ filter: "saturate(.95) brightness(1.02)" }}
        />
        <div className="absolute inset-x-0 top-0 h-[16%] z-[2]" style={{ background: "linear-gradient(to bottom, var(--herobg), rgba(238,241,251,0))" }} />
        <div className="absolute inset-x-0 bottom-0 h-[32%] z-[2]" style={{ background: "linear-gradient(to top, var(--herobg) 2%, rgba(238,241,251,0))" }} />
        <div className="pointer-events-auto absolute inset-0">
          <MapOverlays job={job} shown={shown} onClose={() => setShown(false)} variant="desktop" />
        </div>
      </div>

      <div className="relative z-[3] mx-auto max-w-wrap px-5 flex flex-col lg:flex-row lg:items-center lg:min-h-[80vh] py-10 lg:py-20 gap-9">
        {/* text */}
        <div className="w-full lg:max-w-[560px]">
          <span className="pill fade-up">
            <span className="w-[7px] h-[7px] rounded-full bg-ink" /> Coventry · Live
          </span>
          <h1 className="fade-up font-display font-black text-ink leading-[1.04] tracking-[-0.02em] mt-5 text-[clamp(2.4rem,9vw,4rem)]" style={{ animationDelay: ".14s" }}>
            Van Hero is <em className="italic font-semibold">Moving</em> Coventry Right Now
            <span className="gdot-big" />
          </h1>
          <p className="fade-up mt-4 text-[1rem] sm:text-[1.05rem] max-w-[42ch]" style={{ animationDelay: ".23s" }}>
            Live removals, man &amp; van, storage and couriers across Coventry &amp; Warwickshire — tracked in real time.
          </p>
          <div className="fade-up mt-8 grid grid-cols-3 gap-4 max-w-[380px]" style={{ animationDelay: ".32s" }}>
            <Stat to={3} label="Crews On The Road" />
            <Stat to={15} label="Quotes Today" />
            <Stat to={42} suffix="min" label="Average Response" />
          </div>
          <div className="fade-up mt-8 flex flex-col sm:flex-row gap-3" style={{ animationDelay: ".41s" }}>
            <a href="#quote" className="inline-flex items-center justify-center bg-brand-yellow text-ink font-display font-bold px-6 py-[13px] rounded-[14px] hover:-translate-y-0.5 transition">
              Get a Free Quote
            </a>
            <a href="tel:+447847117933" className="inline-flex items-center justify-center border-2 border-ink text-ink font-display font-bold px-6 py-[13px] rounded-[14px] hover:-translate-y-0.5 transition">
              +44 7847 117933
            </a>
          </div>
          <div className="fade-up mt-6 flex gap-5 flex-wrap text-[.82rem] text-muted2 font-bold" style={{ animationDelay: ".5s" }}>
            {["Fully Insured", "4.9 Star Rated", "Local Experts"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <i className="not-italic w-[18px] h-[18px] rounded-full bg-dot text-white grid place-items-center text-[.6rem]">✓</i> {t}
              </span>
            ))}
          </div>
        </div>

        {/* mobile: map as a clean card below the text */}
        <div className="lg:hidden relative w-full h-[300px] rounded-2xl overflow-hidden shadow-[0_20px_44px_-24px_rgba(11,27,74,.55)]">
          <Image src="/map.webp" alt="Live map of Coventry showing Van Hero coverage" fill sizes="100vw" className="object-cover" />
          <MapOverlays job={job} shown={shown} onClose={() => setShown(false)} variant="mobile" />
        </div>
      </div>
    </section>
  );
}
