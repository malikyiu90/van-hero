"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [state, setState] = useState("loading"); // loading -> leaving -> gone
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try { seen = sessionStorage.getItem("vh-loaded") === "1"; } catch {}
    if (reduce || seen) { setState("gone"); return; }

    document.body.style.overflow = "hidden";
    const dur = 1700;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setPct(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setState("leaving"), 220);
        setTimeout(() => {
          setState("gone");
          document.body.style.overflow = "";
          try { sessionStorage.setItem("vh-loaded", "1"); } catch {}
        }, 220 + 850);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = ""; };
  }, []);

  if (state === "gone") return null;

  return (
    <div className={`vh-loader ${state === "leaving" ? "vh-leaving" : ""}`} aria-hidden="true">
      <div className="vh-loader-inner">
        <div className="vh-logo-anim">
          <span className="vh-box">VH</span>
          <span className="vh-word"><span className="van">VAN</span><span className="hero">HERO</span></span>
        </div>
        <div className="vh-road">
          <div className="vh-road-fill" style={{ width: pct + "%" }} />
          <span className="vh-van" style={{ left: pct + "%" }}>🚐</span>
        </div>
        <div className="vh-pct">{pct}%</div>
        <div className="vh-tag">Moving Britain, one load at a time</div>
      </div>
    </div>
  );
}
