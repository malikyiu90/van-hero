import Image from "next/image";
import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BecomeHeroForm from "@/components/BecomeHeroForm";
import { HowItWorks } from "@/components/Sections";

export const metadata = {
  title: "Van Driver & Removals Jobs in Coventry — Become a Van Hero",
  description:
    "Earn £800–£1,500 per week as a professional Van Hero. Be your own boss, choose your hours, and work with a team that values your graft. Now hiring drivers in Coventry.",
};

const stats = [
  { icon: "💳", value: "0", suffix: "%", label: "Joining Fees" },
  { icon: "📦", value: "100", suffix: "+", label: "Weekly Jobs" },
  { icon: "🦸", value: "40", suffix: "+", label: "Active Drivers" },
  { icon: "💷", value: "800", prefix: "£", suffix: "+", label: "Weekly Earning" },
];

const paths = [
  { title: "Part-Time", pay: "£200–£300", per: "/wk", popular: false,
    points: ["2-3 Days Per Week", "Evening & Weekends", "Local Coventry Jobs"] },
  { title: "Full-Time", pay: "£500–£600", per: "/wk", popular: true,
    points: ["5 Days Guaranteed", "Priority Booking App", "Regional & Long Haul"] },
  { title: "Operator", pay: "£800–£1,000", per: "/wk", popular: false,
    points: ["Manage 2+ Vans", "Business Dashboard", "Unlimited Job Access"] },
];

const models = [
  {
    badge: "Most Earned", badgeTone: "navy",
    title: "Drive Your Own Van",
    blurb: "Become a Partner. Use your own vehicle and maximize your gross revenue.",
    points: ["Earn £800 – £1,500 Gross/Week", "Highest Earning Potential", "Greater Schedule Control"],
    note: "* Driver covers fuel, insurance, and maintenance.",
  },
  {
    badge: "Easiest Start", badgeTone: "yellow",
    title: "Drive Our Van",
    blurb: "Hassle-Free. We provide the van, the insurance, and the fuel. You provide the skill.",
    points: ["Earn £450 – £850 Net/Week", "Zero Vehicle Costs", "Full Maintenance Included"],
    note: "* Pure take-home pay after all vehicle expenses.",
  },
];

const steps = [
  { n: "01", title: "Apply Online", text: "Fill out 5 Mins Form with Basic Details & Experience Levels", tone: "navy" },
  { n: "02", title: "Verification", text: "Quick Document check & brief chat with our driver coordinator", tone: "soft" },
  { n: "03", title: "Start Earning", text: "Get your Login, Pick your first job & start earning within 48 hours.", tone: "yellow" },
];

const eligibility = [
  "Valid UK driving License (No more than 6 points)",
  "Physical fitness for furniture removals",
  "Professional & friendly attitude",
  "Living in or near Coventry area",
];

const needs = [
  { icon: "🪪", title: "Driver Requirements", items: ["Full UK Manual License (Cat B)", "Minimum 21 years of age", "Right to work in the UK", "Good communication skills (English)"] },
  { icon: "🚚", title: "Vehicle Requirements", items: ["3.5t Long Wheel Base (LWB) Van preferred", "Clean, well-maintained exterior", "Vehicle age under 10 years", "Valid MOT and Service history"] },
  { icon: "🛡️", title: "Insurance & Docs", items: ["Hire & Reward Insurance", "Public Liability Insurance (£1M+)", "Goods in Transit Insurance", "DVLA Check Code"] },
  { icon: "⭐", title: "Attitude & Experience", items: ["Previous multi-drop or removals experience", "Punctual and reliable professional", "Physically fit for removals lifting", 'Positive "can-do" Hero attitude'] },
];

export default function BecomeHeroPage() {
  return (
    <main>
      <Nav />

      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <span className="text-ink font-semibold">Become a Hero</span>
        </div>
      </div>

      {/* ---------- hero ---------- */}
      <section className="bg-herobg py-12 md:py-16">
        <div className="mx-auto max-w-wrap px-5 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <div>
            <span className="pill">★ Now Hiring Drivers in Coventry</span>
            <h1 className="font-display font-extrabold text-ink text-[clamp(2.2rem,6vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mt-4">
              Van Driver &amp; Removals <span className="text-brand-blue">Jobs in Coventry</span>
            </h1>
            <p className="mt-4 text-[1.02rem] text-muted max-w-[52ch] leading-relaxed">
              Earn £800–£1,500 per week as a professional Van Hero. Be your own boss, choose your hours,
              and work with a team that values your graft.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#apply" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-ink font-display font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition">
                Apply in 5 Mins →
              </a>
              <a href="#earnings" className="inline-flex items-center justify-center gap-2 border-2 border-ink text-ink font-display font-bold px-6 py-3.5 rounded-xl hover:bg-ink hover:text-white transition">
                See Earning &amp; Benefits
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_-34px_rgba(4,5,66,.6)] aspect-[4/3]">
              <Image src="/services/manvan-hero.webp" alt="Van Hero driver with a removals van in Coventry" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" priority />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-brand-yellow text-ink text-[.72rem] font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg shadow">
                ● 40+ Active Heros
              </span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-[0_20px_45px_-25px_rgba(4,5,66,.5)] border border-line max-w-[330px] mt-[-40px] ml-4 relative z-10">
              <p className="text-[.88rem] text-ink leading-snug">
                &ldquo;Finally a Company that pays you on time &amp; treats you like a partner not a number.&rdquo;
              </p>
              <div className="flex items-center gap-2.5 mt-3">
                <span className="w-9 h-9 rounded-full bg-brand-blue text-white grid place-items-center font-display font-bold text-[.85rem]">J</span>
                <span>
                  <span className="block font-semibold text-ink text-[.88rem] leading-tight">John D.</span>
                  <span className="block text-[.76rem] text-muted">Hero since 2022</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- why join: stats ---------- */}
      <section className="bg-brand-blue py-12 md:py-14">
        <div className="mx-auto max-w-wrap px-5">
          <h2 className="font-display font-extrabold text-white text-center text-[clamp(1.6rem,3.6vw,2.3rem)]">
            Why Joining Van Hero?
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-9">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 grid place-items-center text-[1.3rem]">{s.icon}</div>
                <div className="font-display font-extrabold text-brand-yellow text-[2rem] leading-none mt-3">
                  {s.prefix}{s.value}<span className="text-[1.1rem] align-super">{s.suffix}</span>
                </div>
                <div className="text-white/75 text-[.82rem] font-semibold mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- what you can earn ---------- */}
      <section id="earnings" className="py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5">
          <div className="text-center max-w-[56ch] mx-auto">
            <span className="pill">Transparent Earnings</span>
            <h2 className="font-display font-extrabold text-ink text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.02em] mt-4">
              What You Can Earn
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-10 items-start">
            {paths.map((p) => (
              <div
                key={p.title}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  p.popular ? "bg-white border-2 border-brand-yellow shadow-[0_26px_55px_-30px_rgba(4,5,66,.5)] md:-mt-3" : "bg-white border border-line"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-yellow text-ink text-[.68rem] font-bold uppercase tracking-wide px-3 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display font-bold text-ink text-[1.3rem]">{p.title}</h3>
                <div className="mt-1.5">
                  <span className="font-display font-extrabold text-ink text-[1.8rem]">{p.pay}</span>
                  <span className="text-muted text-[.85rem]"> {p.per}</span>
                </div>
                <ul className="mt-5 flex flex-col gap-2.5 flex-1">
                  {p.points.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-[.9rem] text-muted">
                      <span className="w-5 h-5 shrink-0 rounded-full bg-dot/15 text-dot grid place-items-center text-[.7rem] mt-0.5">✓</span>
                      {x}
                    </li>
                  ))}
                </ul>
                <a
                  href="#apply"
                  className={`mt-6 inline-flex items-center justify-center font-display font-bold px-5 py-3 rounded-xl transition ${
                    p.popular ? "bg-brand-yellow text-ink hover:-translate-y-0.5" : "border-2 border-line text-ink hover:border-ink"
                  }`}
                >
                  Select Path
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- choose how you grow ---------- */}
      <section className="bg-softblue py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5">
          <div className="text-center max-w-[62ch] mx-auto">
            <h2 className="font-display font-extrabold text-ink text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.02em]">
              Choose How You Grow
            </h2>
            <p className="text-muted mt-3 text-[1rem] leading-relaxed">
              We offer flexibility to suit your career goals. Whether you&apos;re an established owner-driver
              or looking for a fresh start without the overheads.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {models.map((m) => (
              <div key={m.title} className="relative bg-white rounded-2xl p-6 border border-line">
                <span className={`absolute top-5 right-5 text-[.68rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md ${
                  m.badgeTone === "yellow" ? "bg-brand-yellow text-ink" : "bg-navy text-white"
                }`}>
                  {m.badge}
                </span>
                <div className="w-11 h-11 rounded-xl bg-softblue grid place-items-center text-[1.3rem]">🚐</div>
                <h3 className="font-display font-bold text-ink text-[1.35rem] mt-4">{m.title}</h3>
                <p className="text-muted text-[.92rem] mt-2 leading-relaxed">{m.blurb}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {m.points.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-[.9rem] text-ink">
                      <span className="w-5 h-5 shrink-0 rounded-full bg-dot/15 text-dot grid place-items-center text-[.7rem] mt-0.5">✓</span>
                      {x}
                    </li>
                  ))}
                </ul>
                <p className="text-[.78rem] text-muted2 mt-4">{m.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-white border border-line rounded-2xl p-5 flex gap-3">
            <span className="text-brand-blue text-[1.1rem]">ℹ️</span>
            <div>
              <div className="font-display font-bold text-ink text-[.95rem]">Transparency Note</div>
              <p className="text-muted text-[.88rem] mt-1 leading-relaxed">
                The &ldquo;Own Van&rdquo; model shows gross figures before business expenses. The &ldquo;Our Van&rdquo; model
                shows actual earnings after vehicle costs are cleared. We believe in being upfront about what stays in your pocket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- three steps ---------- */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5">
          <h2 className="font-display font-extrabold text-ink text-center text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.02em]">
            Three Steps Getting On Board
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {steps.map((s) => {
              const tone =
                s.tone === "navy" ? "bg-navy text-white"
                : s.tone === "yellow" ? "bg-brand-yellow text-ink"
                : "bg-softblue text-ink";
              const sub = s.tone === "navy" ? "text-white/80" : s.tone === "yellow" ? "text-ink/75" : "text-muted";
              return (
                <div key={s.n} className={`rounded-2xl p-6 ${tone}`}>
                  <div className="font-display font-extrabold text-[1.6rem] opacity-60">{s.n}</div>
                  <h3 className="font-display font-bold text-[1.2rem] mt-2">{s.title}</h3>
                  <p className={`text-[.9rem] mt-2 leading-relaxed ${sub}`}>{s.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- eligibility + application form ---------- */}
      <section id="apply" className="bg-herobg py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5 grid lg:grid-cols-[1fr_1.05fr] gap-10 items-start">
          <div className="lg:pt-4">
            <h2 className="font-display font-extrabold text-brand-blue text-[clamp(1.7rem,3.6vw,2.3rem)] tracking-[-0.02em]">
              Quick Eligibility Check
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {eligibility.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[.95rem] text-ink">
                  <span className="w-5 h-5 shrink-0 rounded bg-brand-blue text-white grid place-items-center text-[.7rem] mt-0.5">✓</span>
                  {x}
                </li>
              ))}
            </ul>
            <p className="text-muted text-[.9rem] mt-6 leading-relaxed">
              Tick all four? You&apos;re exactly who we&apos;re looking for. Fill in the form and our driver
              coordinator will be in touch within 48 hours.
            </p>
          </div>

          <BecomeHeroForm />
        </div>
      </section>

      {/* ---------- what you'll need ---------- */}
      <section className="bg-navy py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5">
          <div className="text-center max-w-[60ch] mx-auto">
            <h2 className="font-display font-extrabold text-white text-[clamp(1.8rem,4vw,2.6rem)] tracking-[-0.02em]">
              What You&apos;ll Need
            </h2>
            <p className="text-white/70 mt-3 text-[.98rem]">
              We maintain high standards to ensure the &ldquo;Hero&rdquo; name means quality. Check if you qualify below.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {needs.map((n) => (
              <div key={n.title} className="bg-white/[.06] border border-white/15 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-brand-yellow text-ink grid place-items-center text-[1.15rem]">{n.icon}</span>
                  <h3 className="font-display font-bold text-white text-[1.1rem]">{n.title}</h3>
                </div>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {n.items.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-[.88rem] text-white/80">
                      <span className="text-brand-yellow mt-0.5">✓</span> {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <Newsletter />
      <Footer />
    </main>
  );
}
