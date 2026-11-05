import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FAQ — Van Hero",
  description: "Answers to common questions about Van Hero removals, pricing, booking, insurance and the areas we cover across Coventry, Warwickshire and the UK.",
};

const groups = [
  {
    heading: "General",
    faqs: [
      { q: "What services does Van Hero offer?", a: "Everything from a single man-with-a-van job to full house removals, office relocations, furniture delivery, student moves, European moves, packing, storage, courier runs, house clearance, handyman work and waste management." },
      { q: "Which areas do you cover?", a: "We're based in Coventry and cover the whole of Warwickshire — Rugby, Leamington Spa, Warwick, Kenilworth, Nuneaton, Bedworth and more — plus long-distance moves across the UK and into Europe." },
      { q: "Do you help carry and load, or just drive?", a: "We do the lifting, carrying, loading and unloading for you. Our team handles your belongings with care from start to finish." },
    ],
  },
  {
    heading: "Pricing & Quotes",
    faqs: [
      { q: "How much will my move cost?", a: "Prices start from £25 for a single item. Your exact price depends on the size of the move, the crew needed and the distance — we always give you a fixed, no-obligation quote upfront with no hidden fees." },
      { q: "Do you charge by the hour?", a: "We price by the size of your move and the crew required — not the clock. Every package includes the van, experienced movers, fuel and standard equipment, so there are no surprise charges." },
      { q: "Is the quote really free?", a: "Yes. Quotes are completely free and no-obligation. Call, WhatsApp or fill in the form and we'll come back with a clear fixed price." },
    ],
  },
  {
    heading: "Booking & Timing",
    faqs: [
      { q: "Can you come the same day?", a: "Often, yes — same-day availability depends on the time and your location. Call us and we'll do our best to fit you in." },
      { q: "How far in advance should I book?", a: "The sooner the better for weekends and month-end dates, which book up fast. But we also keep slots for same-day and short-notice jobs." },
      { q: "Do you work evenings and weekends?", a: "Yes. We offer flexible appointments including evenings and weekends, which is how most of our office moves run to avoid business downtime." },
    ],
  },
  {
    heading: "Insurance & Safety",
    faqs: [
      { q: "Are my items insured?", a: "Yes. Your belongings are covered by goods-in-transit and public liability insurance while in our care, on every job." },
      { q: "Do you protect furniture and floors?", a: "Yes — heavy-duty blankets and straps secure every item in the van, and protective runners keep your carpets and floors clean at both ends." },
      { q: "Do you dismantle and reassemble furniture?", a: "Yes, as standard. We take apart beds, wardrobes and flat-pack furniture, move them safely, and rebuild them in your new home." },
    ],
  },
];

export default function FaqPage() {
  return (
    <main>
      <Nav />
      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <span className="text-ink font-semibold">FAQ</span>
        </div>
      </div>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-wrap px-5">
          <div className="max-w-[640px]">
            <span className="pill">Frequently Asked Questions</span>
            <h1 className="font-display font-black text-ink text-[clamp(2.2rem,5vw,3.4rem)] tracking-[-0.02em] mt-4">Questions &amp; Answers</h1>
            <p className="text-muted mt-3 text-[1.05rem]">Everything you need to know about moving with Van Hero. Still got a question? Just call or message us.</p>
          </div>

          <div className="mt-10 flex flex-col gap-10 max-w-[800px]">
            {groups.map((g) => (
              <div key={g.heading}>
                <h2 className="font-display font-bold text-ink text-[1.4rem] mb-4">{g.heading}</h2>
                <div className="flex flex-col gap-2">
                  {g.faqs.map((f, i) => (
                    <details key={i} className="group bg-white rounded-xl border border-line px-5 py-4">
                      <summary className="flex items-center gap-3 cursor-pointer list-none font-display font-bold text-ink">
                        <span className="flex-1">{f.q}</span>
                        <span className="text-brand-blue text-xl transition group-open:rotate-45">+</span>
                      </summary>
                      <p className="text-muted text-[.92rem] mt-3 leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
