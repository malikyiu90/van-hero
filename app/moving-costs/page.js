import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ManVanForm from "@/components/ManVanForm";
import { HowItWorks } from "@/components/Sections";

export const metadata = {
  title: "Moving Costs & Pricing — Van Hero",
  description: "Transparent Van Hero pricing for house removals, man & van, furniture, student moves, office moves and storage. Fixed quotes, no hidden fees.",
};

const tables = [
  {
    title: "House Removals", cols: ["Property Size", "Start From"],
    rows: [["1 Bedroom / Flat", "£50"], ["2 Bedroom House", "£100"], ["3 Bedroom House", "£145"], ["4+ Bedroom House", "£175"]],
    href: "/local-moving",
  },
  {
    title: "Man with a Van", cols: ["Move Size", "Start From"],
    rows: [["Single Item", "£25"], ["Small Load", "£65"], ["Studio / 1-Bed", "£85"], ["2-Bed Home", "£110"]],
    href: "/man-with-van",
  },
  {
    title: "Student Moves", cols: ["Service", "Start From"],
    rows: [["Boxes & Bags", "£25"], ["Full Room", "£65"], ["House Share", "£120"]],
    href: "/student-moves-coventry",
  },
  {
    title: "Office Removals", cols: ["Office Size", "Start From"],
    rows: [["Small Office (up to 10)", "£350+"], ["Large Workspace (up to 30)", "£900+"], ["Corporate HQ", "Custom"]],
    href: "/office-removals",
  },
  {
    title: "Storage", cols: ["Unit Size", "Price"],
    rows: [["25 sq ft", "£14/wk"], ["50 sq ft", "£22/wk"], ["100 sq ft", "£35/wk"], ["150 sq ft", "£49/wk"]],
    href: "/storage",
  },
  {
    title: "House Clearance", cols: ["Load Size", "Price"],
    rows: [["Quarter Load", "£80"], ["Half Load", "£149"], ["Full Van", "£249"], ["Multi-Van", "Custom"]],
    href: "/house-clearance",
  },
];

export default function MovingCostsPage() {
  return (
    <main>
      <Nav />
      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <span className="text-ink font-semibold">Moving Costs</span>
        </div>
      </div>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-wrap px-5">
          <div className="max-w-[640px]">
            <span className="pill">Transparent Pricing</span>
            <h1 className="font-display font-black text-ink text-[clamp(2.1rem,5vw,3.3rem)] tracking-[-0.02em] mt-4">Moving Costs</h1>
            <p className="text-muted mt-3 text-[1.05rem] leading-relaxed">Clear starting prices across all our services. Final quotes are fixed and based on the size of your move, the crew needed and the distance — never an hourly meter, and never any hidden fees.</p>
          </div>

          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-10 mt-10 items-start">
            <div className="grid sm:grid-cols-2 gap-6">
              {tables.map((t) => (
                <div key={t.title} className="bg-white border border-line rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 bg-navy text-white font-display font-bold flex items-center justify-between">
                    {t.title}
                    <a href={t.href} className="text-brand-yellow text-[.75rem] font-semibold">View →</a>
                  </div>
                  <table className="w-full text-left">
                    <thead><tr className="text-muted2 text-[.72rem] uppercase tracking-wide">
                      {t.cols.map((c) => <th key={c} className="px-5 pt-3 pb-1 font-bold">{c}</th>)}
                    </tr></thead>
                    <tbody>
                      {t.rows.map((r, i) => (
                        <tr key={i} className="border-t border-line">
                          <td className="px-5 py-2.5 text-ink font-semibold text-[.9rem]">{r[0]}</td>
                          <td className="px-5 py-2.5"><span className="font-display font-black text-brand-blue text-[1.1rem]">{r[1]}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            <div className="lg:sticky lg:top-24">
              <ManVanForm pill="★ Free Quote" title="Get Your Fixed Price" subtitle="Tell us about your move for an exact quote." />
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Newsletter />
      <Footer />
    </main>
  );
}
