"use client";
import { useState } from "react";
import Logo from "@/components/Logo";
import { serviceList } from "@/lib/serviceList";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Services ▾", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Become Hero", href: "/become-hero" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const close = () => { setOpen(false); setSvcOpen(false); };

  return (
    <>
      {/* top utility bar */}
      <div className="bg-navy text-white/80 text-[11px] sm:text-[13px]">
        <div className="mx-auto max-w-wrap px-4 sm:px-5 py-[7px] flex items-center gap-2 sm:gap-4">
          <span className="inline-flex items-center gap-1.5 font-display font-bold uppercase tracking-[.08em] sm:tracking-[.1em] text-[10px] sm:text-[11px] text-white whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-softpulse shrink-0" /> Live across the UK
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
            <Logo tone="light" className="h-14 w-auto" />
          </a>

          <nav className="ml-auto hidden lg:flex gap-6 font-semibold text-[15px] items-center">
            {links.map((l) =>
              l.label.startsWith("Services") ? (
                <div key="services" className="relative group">
                  <a href="/services" className="text-brand-navlink hover:text-ink inline-flex items-center gap-1">
                    Services <span className="text-[.65em] transition-transform group-hover:rotate-180">▾</span>
                  </a>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 hidden group-hover:block z-50">
                    <div className="bg-white rounded-2xl shadow-[0_24px_60px_-20px_rgba(11,27,74,.45)] border border-line p-2.5 w-[540px] grid grid-cols-2 gap-1">
                      {serviceList.map((s) => (
                        <a key={s.slug} href={s.slug} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-soft transition">
                          <span className="w-9 h-9 shrink-0 rounded-lg bg-softblue grid place-items-center text-[1.1rem]">{s.icon}</span>
                          <span className="text-ink font-semibold text-[.9rem]">{s.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className={l.active ? "text-[#111] font-bold" : "text-brand-navlink hover:text-ink"}
                >
                  {l.label}
                </a>
              )
            )}
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
          <nav className="lg:hidden border-t border-line bg-white px-5 py-3 flex flex-col gap-1 font-semibold">
            {links.map((l) =>
              l.label.startsWith("Services") ? (
                <button
                  key="services"
                  onClick={() => setSvcOpen(true)}
                  className="w-full flex items-center justify-between py-2 text-brand-navlink"
                >
                  <span>Services</span>
                  <span className="text-ink text-[1.2em]">›</span>
                </button>
              ) : (
                <a key={l.label} href={l.href} className="py-2 text-brand-navlink" onClick={close}>
                  {l.label}
                </a>
              )
            )}
            <a href="#quote" className="mt-2 inline-flex justify-center bg-ink text-white rounded-full py-2 font-display" onClick={close}>
              Get In Touch ↗
            </a>
          </nav>
        )}
      </header>

      {/* mobile Services sidebar drawer */}
      <div className={`lg:hidden fixed inset-0 z-[70] transition-opacity duration-200 ${svcOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {/* backdrop */}
        <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={() => setSvcOpen(false)} />
        {/* drawer */}
        <aside className={`absolute top-0 right-0 h-full w-[86%] max-w-[360px] bg-white shadow-[0_0_60px_rgba(11,27,74,.35)] flex flex-col transition-transform duration-300 ${svcOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center gap-3 px-5 h-16 border-b border-line shrink-0">
            <span className="font-display text-ink text-[1.2rem]">Our Services</span>
            <button onClick={() => setSvcOpen(false)} aria-label="Close" className="ml-auto w-10 h-10 -mr-2 rounded-full grid place-items-center text-muted text-[1.4rem]">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto px-3.5 py-3.5">
            <a href="/services" onClick={close} className="flex items-center justify-between mb-2.5 px-4 py-3 rounded-xl bg-ink text-white font-display text-[.95rem]">
              <span>View All Services</span><span>→</span>
            </a>
            <div className="flex flex-col gap-1.5">
              {serviceList.map((s) => (
                <a key={s.slug} href={s.slug} onClick={close} className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-soft active:bg-soft transition">
                  <span className="w-10 h-10 shrink-0 rounded-xl bg-softblue grid place-items-center text-[1.2rem]">{s.icon}</span>
                  <span className="text-ink font-semibold text-[.95rem] leading-tight">{s.title}</span>
                  <span className="ml-auto text-muted2">›</span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
