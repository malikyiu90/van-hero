"use client";
import { useEffect, useState } from "react";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm0 18.13h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 5.83 2.42 8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Z" />
  </svg>
);
const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M8 9h.01M12 9h5M8 13h.01M12 13h5M8 17h.01M12 17h5" />
  </svg>
);

const ACTIONS = [
  { label: "Phone", href: "tel:+447847117933", Icon: PhoneIcon },
  { label: "Email", href: "mailto:info@vanhero.online", Icon: MailIcon },
  { label: "WhatsApp", href: "https://wa.me/447847117933", Icon: WhatsAppIcon, external: true },
  { label: "Book a quote", href: "/contact", Icon: QuoteIcon },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-[80] flex flex-col items-start gap-3">
      {ACTIONS.map(({ label, href, Icon, external }, i) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
          aria-hidden={!open}
          className={`flex items-center gap-3 transition-all duration-300 ${
            open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
          style={{ transitionDelay: open ? `${i * 45}ms` : `${(ACTIONS.length - 1 - i) * 30}ms` }}
        >
          <span className="w-[52px] h-[52px] shrink-0 rounded-full bg-navy text-white grid place-items-center shadow-[0_10px_24px_-8px_rgba(4,5,66,.7)] hover:scale-105 active:scale-95 transition">
            <Icon />
          </span>
          <span className="bg-white text-ink font-semibold text-[.9rem] px-4 py-2 rounded-xl shadow-[0_8px_22px_-8px_rgba(4,5,66,.45)] whitespace-nowrap">
            {label}
          </span>
        </a>
      ))}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact menu" : "Contact Van Hero"}
        className="w-[58px] h-[58px] rounded-full bg-brand-blue text-white grid place-items-center ring-4 ring-white shadow-[0_12px_30px_-8px_rgba(0,36,151,.8)] hover:scale-105 active:scale-95 transition"
      >
        <span className={`transition-transform duration-300 ${open ? "rotate-0" : "rotate-0"}`}>
          {open ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
