"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`btt-btn fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-brand-yellow text-ink shadow-[0_10px_26px_-8px_rgba(224,165,0,.9)] grid place-items-center text-[1.3rem] transition-all duration-300 hover:-translate-y-1 ${
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <span className="btt-van">🚐</span>
    </button>
  );
}
