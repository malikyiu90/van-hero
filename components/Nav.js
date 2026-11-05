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
                <div key="services">
                  <button
                    onClick={() => setSvcOpen((v) => !v)}
                    aria-expanded={svcOpen}
                    className="w-full flex items-center justify-between py-2 text-brand-navlink"
                  >
                    <span>Services</span>
                    <span className={`text-ink transition-transform ${svcOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>
                  {svcOpen && (
                    <div className="ml-1 pl-3 border-l-2 border-line flex flex-col pb-1">
                      <a href="/services" className="py-1.5 text-ink text-[.9rem]" onClick={close}>All Services</a>
                      {serviceList.map((s) => (
                        <a key={s.slug} href={s.slug} className="py-1.5 text-muted text-[.9rem]" onClick={close}>{s.title}</a>
                      ))}
                    </div>
                  )}
                </div>
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
    </>
  );
}
