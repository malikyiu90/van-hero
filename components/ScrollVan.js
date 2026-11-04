"use client";
import { useEffect, useState } from "react";

export default function ScrollVan() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? Math.min(el.scrollTop / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="hidden lg:block fixed right-5 top-28 bottom-28 z-40 w-7 pointer-events-none" aria-hidden="true">
      <div className="relative h-full w-[3px] mx-auto rounded-full" style={{ background: "rgba(120,130,160,.3)" }}>
        {/* dashed centre line */}
        <div className="absolute inset-0 rounded-full" style={{ background: "repeating-linear-gradient(to bottom, rgba(120,130,160,.45) 0 6px, transparent 6px 13px)" }} />
        {/* yellow route fill */}
        <div className="absolute left-0 right-0 top-0 rounded-full bg-brand-yellow" style={{ height: p * 100 + "%" }} />
        {/* driving van marker */}
        <span
          className="absolute left-1/2 w-8 h-8 rounded-full bg-white grid place-items-center text-[1rem] shadow-[0_4px_12px_rgba(11,27,74,.35)] ring-2 ring-brand-yellow"
          style={{ top: `calc(${p * 100}% - 16px)`, transform: "translateX(-50%) rotate(90deg)", transition: "top .12s linear" }}
        >
          🚐
        </span>
      </div>
    </div>
  );
}
