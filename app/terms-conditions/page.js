import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions — Van Hero",
  description: "The terms and conditions for Van Hero Logistics Limited removals, storage and related services.",
};

const sections = [
  { h: "1. About Us", p: "These terms govern the services provided by Van Hero Logistics Limited (\"Van Hero\", \"we\", \"us\"), registered in England & Wales, Unit 14, Herald Business Park, Golden Acres Lane, Coventry, CV3 2SY. By booking a service you agree to these terms." },
  { h: "2. Quotes & Pricing", p: "All quotes are based on the information you provide about your move. Prices are fixed once confirmed, unless the scope of the work changes materially on the day (for example extra items, longer distances or access difficulties not disclosed at booking). We will always tell you before any additional charge applies." },
  { h: "3. Bookings & Payment", p: "A booking is confirmed once we have agreed a date, time and price with you. Payment is due on completion of the work unless agreed otherwise in writing. We accept the payment methods stated at the time of booking." },
  { h: "4. Cancellations & Rescheduling", p: "Please give us as much notice as possible if you need to cancel or reschedule. Cancellations at very short notice, or on the day, may incur a charge to cover the crew and vehicle reserved for you." },
  { h: "5. Your Responsibilities", p: "Please ensure items are ready to move at the agreed time, that parking and access are arranged, and that you declare any particularly heavy, fragile, hazardous or high-value items in advance. We may decline to move items that are unsafe or illegal to transport." },
  { h: "6. Insurance & Liability", p: "We carry goods-in-transit and public liability insurance. Our liability is limited to the terms of that cover. We are not liable for items packed by you, for inherent faults or pre-existing damage, or for delays caused by circumstances beyond our control." },
  { h: "7. Storage", p: "Where storage is provided, goods are stored at your risk subject to the insurance cover in place. Storage charges are payable in advance for the agreed period. We may apply a lien over stored goods where charges remain unpaid." },
  { h: "8. Complaints", p: "We aim to get every move right. If something isn't right, please contact us as soon as possible and we will do our best to put it right quickly and fairly." },
  { h: "9. Governing Law", p: "These terms are governed by the laws of England & Wales, and any disputes are subject to the exclusive jurisdiction of its courts." },
];

export default function TermsPage() {
  return (
    <main>
      <Nav />
      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <span className="text-ink font-semibold">Terms &amp; Conditions</span>
        </div>
      </div>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-[800px] px-5">
          <span className="pill">Legal</span>
          <h1 className="font-display font-black text-ink text-[clamp(2.1rem,5vw,3rem)] tracking-[-0.02em] mt-4">Terms &amp; Conditions</h1>
          <p className="text-muted mt-3">Please read these terms carefully before booking. They set out the basis on which Van Hero provides its services.</p>

          <div className="mt-10 flex flex-col gap-7">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display font-bold text-ink text-[1.25rem]">{s.h}</h2>
                <p className="text-muted mt-2 leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>

          <p className="text-muted2 text-[.82rem] mt-10">© 2026 Van Hero Logistics Limited. Company Registration No. 12345678 · VAT Reg: GB 987 6543 21.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
