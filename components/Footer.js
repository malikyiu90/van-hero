import Logo from "@/components/Logo";
import { Facebook, XTwitter, LinkedIn, Instagram } from "@/components/icons";

const svc = [
  { label: "Storage", href: "/storage" },
  { label: "Local Moving", href: "/local-moving" },
  { label: "Handyman", href: "/handyman" },
  { label: "Man with Van", href: "/man-with-van" },
  { label: "Office Removal", href: "/office-removals" },
  { label: "Student Moves", href: "/student-moves-coventry" },
  { label: "Courier Service", href: "/courier-services" },
  { label: "Packing", href: "/packing-services" },
];
const area = ["Coventry (HQ)", "Finham", "Coundon", "Radford", "Wyken", "Walsgrave", "Nuneaton", "Leamington Spa"];
const socials = [
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: XTwitter, label: "X (Twitter)", href: "https://x.com" },
  { Icon: LinkedIn, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white/70">
      <div className="mx-auto max-w-wrap px-5 pt-14 pb-7">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.2fr]">
          {/* brand */}
          <div>
            <Logo tone="dark" className="h-16 w-auto" />
            <p className="mt-4 max-w-[34ch] text-[.92rem] leading-relaxed">
              Coventry&apos;s trusted movers since 2020. Precision logistics for a stress-free move.
            </p>
            <div className="text-[.92rem] leading-[2] mt-4">
              <a href="tel:+447847117933" className="font-bold text-white hover:text-brand-yellow transition">📞 +44 7847 117933</a><br />
              <a href="mailto:info@vanhero.online" className="hover:text-white transition">✉️ info@vanhero.online</a><br />
              <span className="inline-flex gap-2"><span>📍</span> Unit 14, Herald Business Park, Golden Acres Lane, Coventry, CV3 2SY</span>
            </div>
            <div className="flex gap-2.5 mt-5">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/20 grid place-items-center text-white/80 hover:bg-brand-yellow hover:text-navy hover:border-brand-yellow transition"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* services */}
          <div>
            <h4 className="font-display text-brand-yellow text-[.8rem] uppercase tracking-wide mb-4">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {svc.map((s) => <li key={s.label}><a href={s.href} className="inline-block py-1 text-[.92rem] hover:text-white transition">{s.label}</a></li>)}
            </ul>
          </div>

          {/* areas */}
          <div>
            <h4 className="font-display text-brand-yellow text-[.8rem] uppercase tracking-wide mb-4">Areas</h4>
            <ul className="flex flex-col gap-2.5">
              {area.map((a) => <li key={a}><a href="/#areas" className="inline-block py-1 text-[.92rem] hover:text-white transition">{a}</a></li>)}
            </ul>
          </div>

          {/* contact / hours */}
          <div>
            <h4 className="font-display text-brand-yellow text-[.8rem] uppercase tracking-wide mb-4">Opening Hours</h4>
            <div className="text-[.92rem] leading-[1.9]">
              <div className="flex justify-between gap-4 border-b border-white/10 py-1"><span>Mon – Fri</span><span className="text-white">8:00 – 18:00</span></div>
              <div className="flex justify-between gap-4 border-b border-white/10 py-1"><span>Saturday</span><span className="text-white">8:00 – 18:00</span></div>
              <div className="flex justify-between gap-4 py-1"><span>Sunday</span><span className="text-white">10:00 – 14:00</span></div>
            </div>
            <a href="/contact" className="mt-4 inline-flex items-center justify-center bg-brand-yellow text-ink font-display font-bold text-[.85rem] px-4 py-2.5 rounded-xl hover:-translate-y-0.5 transition">
              Get a Free Quote →
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between gap-4 text-[.8rem] text-white/55">
          <div>© {new Date().getFullYear()} Van Hero Logistics Limited. All rights reserved.</div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <a href="/terms-conditions" className="py-1 hover:text-white transition">Terms &amp; Conditions</a>
            <a href="#" className="py-1 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="py-1 hover:text-white transition">Cookies</a>
            <a href="#" className="py-1 hover:text-white transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
