"use client";
import { useState } from "react";
import Logo from "@/components/Logo";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Services ▾", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blogs", href: "#blog" },
  { label: "Become Hero", href: "#become" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* top utility bar */}
      <div className="bg-navy text-white/80 text-[11px] sm:text-[13px]">
        <div className="mx-auto max-w-wrap px-4 sm:px-5 py-[7px] flex items-center gap-2 sm:gap-4">
          <span className="inline-flex items-center gap-1.5 font-display font-bold uppercase tracking-[.08em] sm:tracking-[.1em] text-[10px] sm:text-[11px] text-white whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-softpulse shrink-0" /> Live in Coventry
          </span>
          <span className="ml-auto flex items-center gap-3 sm:gap-5 whitespace-nowrap">
            <a href="tel:+447847117933" className="hover:text-white">☎ +44 7847 117933</a>
            <span className="hidden sm:inline">Mon–Sat 8–18 · Sun 10–14</span>
          </span>
        </div>
      </div>

      {/* nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 flex items-center gap-5">
          <a href="/" className="inline-flex items-center shrink-0" aria-label="Van Hero home">
            <Logo tone="light" />
          </a>

          <nav className="ml-auto hidden lg:flex gap-6 font-semibold text-[15px] items-center">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={l.active ? "text-[#111] font-bold" : "text-brand-navlink hover:text-ink"}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#quote"
            className="ml-3 hidden lg:inline-flex items-center gap-2 bg-ink text-white font-display font-bold text-[15px] px-6 py-[11px] rounded-full hover:-translate-y-0.5 transition"
          >
            Get In Touch ↗
          </a>

          <button
            className="ml-auto lg:hidden border border-line rounded-lg px-3 py-2 text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>

        {open && (
          <nav className="lg:hidden border-t border-line bg-white px-5 py-3 flex flex-col gap-2 font-semibold">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="py-1 text-brand-navlink" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#quote" className="mt-2 inline-flex justify-center bg-ink text-white rounded-full py-2 font-display" onClick={() => setOpen(false)}>
              Get In Touch ↗
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
