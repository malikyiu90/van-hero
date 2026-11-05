import Image from "next/image";
import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import ManVanForm from "@/components/ManVanForm";
import { HowItWorks } from "@/components/Sections";
import { posts, areas } from "@/lib/data";

export const metadata = {
  title: "Man with a Van Coventry — Van Hero",
  description: "Reliable man and van services across Coventry, Warwickshire and the whole UK. Single items to half-house moves from £25. Same-day available, fully insured.",
};

const features = [
  { icon: "📦", title: "Single-Item", text: "Single items, furniture collections and eBay or Facebook Marketplace purchases delivered anywhere in UK. No minimum load size." },
  { icon: "🎓", title: "Student Moves", text: "Affordable, hassle-free moves for Coventry and Whole UK students. Perfect for halls, house shares and summer storage." },
  { icon: "🏬", title: "Store & Flat-Pack Pickups", text: "Bought something that won't fit in the car? We'll collect it from the store and deliver it to your door. Assembly available on request." },
  { icon: "🏠", title: "Small Home Moves", text: "Studios, one-bed flats, and house-shares. All the flexibility of a man with a van, without paying for a full removals crew." },
  { icon: "🛣️", title: "Long Distance", text: "Moving further afield? We provide reliable long-distance man and van services across the UK, with door-to-door delivery." },
  { icon: "🔐", title: "Storage Runs", text: "Moving into or out of storage? We'll safely transport your belongings to or from any self-storage facility." },
];

const pricing = [
  { size: "Single Item", price: "£25", van: "Panel Van", crew: "1 Man" },
  { size: "Small Load", price: "£65", van: "Luton Van", crew: "2 Men" },
  { size: "Studio / 1-Bed", price: "£85", van: "Extra Large Luton", crew: "2 Men" },
  { size: "2-Bed Home", price: "£110", van: "2 x Luton Vans", crew: "3 Men" },
];

const faqs = [
  { q: "How much does a man with a van cost in UK?", a: "Prices start from £25 for a single item. Your exact price depends on the size of the move, the crew needed and the distance — we give you a fixed, no-obligation quote upfront with no hidden fees." },
  { q: "Do you help carry and load, or just drive?", a: "We do the lifting, carrying, loading and unloading for you. Our team handles your belongings with care from start to finish." },
  { q: "Can you come the same day?", a: "Yes — same-day availability is often possible depending on the time and your location. Call us and we'll do our best to fit you in." },
  { q: "Are my items insured?", a: "Yes, your belongings are covered by goods-in-transit and public liability insurance while in our care." },
  { q: "Do you cover moves outside Coventry?", a: "Absolutely. We're based in Coventry but cover Warwickshire and the whole of the UK, including long-distance door-to-door moves." },
  { q: "How far in advance should I book?", a: "The sooner the better for guaranteed slots, but we also take last-minute and same-day bookings whenever we have availability." },
];

const trust = ["Same Day Available", "Rated 4.9/5 by Customers", "On Time, Every Time", "Experienced Local Crew"];

export default function ManWithVanPage() {
  return (
    <main>
      <Nav />

      {/* breadcrumb */}
      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <a href="#services" className="hover:text-brand-blue">Services</a> / <span className="text-ink font-semibold">Man with a Van</span>
        </div>
      </div>

      {/* hero */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-wrap px-5 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="pill">★ Man with a Van in UK</span>
            <h1 className="font-display font-black text-ink text-[clamp(2.4rem,6vw,3.6rem)] tracking-[-0.02em] mt-4">Man with a Van</h1>
            <p className="mt-4 text-[1.02rem] text-muted max-w-[52ch] leading-relaxed">
              Whether you're moving a single item, collecting furniture or relocating a flat, Van Hero provides reliable man and van services across whole UK. Our experienced local team handles the lifting, loading and safe transport with care, making your move quick, straightforward and stress-free. Every move is different, so we'll provide a clear, no-obligation quote based on your requirements before any work begins.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#quote" className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-ink font-display font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition">Get a Free Quote →</a>
              <a href="tel:+447847117933" className="inline-flex items-center justify-center gap-2 border-2 border-ink text-ink font-display font-bold px-6 py-3.5 rounded-xl hover:-translate-y-0.5 transition">📞 Call +44 7847 117933</a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_-34px_rgba(11,27,74,.5)] aspect-[4/3]">
            <Image src="/services/manvan-hero.webp" alt="Van Hero man with a van, loaded and ready" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" priority />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-brand-blue text-white text-[.7rem] font-bold uppercase tracking-wide px-3 py-1.5 rounded-lg shadow">🛡 Same Day Available</span>
          </div>
        </div>
      </section>

      {/* reliable local moving + sticky form */}
      <section className="bg-softblue py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5 grid lg:grid-cols-[1.6fr_1fr] gap-10">
          {/* left */}
          <div>
            <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em]">Reliable Local Moving</h2>
            <div className="w-16 h-1 bg-brand-blue rounded mt-3 mb-6" />
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-6">
              <Image src="/services/manvan.webp" alt="Van Hero branded van" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
            </div>
            <p className="text-muted leading-relaxed">From single-item collections to small home moves, Van Hero provides reliable man and van services across Coventry, Warwickshire and whole UK. Whether it's a sofa, furniture collection, student move or flat move, we'll do the lifting, loading and transport—so you don't have to.</p>
            <p className="text-muted leading-relaxed mt-3">Our friendly local team turns up on time, handles your belongings with care and gets the job done properly. Fast, flexible and hassle-free.</p>

            {/* feature cards */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
              {features.map((f) => (
                <div key={f.title} className="bg-white border border-line rounded-2xl p-5">
                  <div className="w-11 h-11 rounded-xl bg-softblue grid place-items-center text-[1.3rem] mb-3">{f.icon}</div>
                  <h3 className="font-display font-bold text-ink text-[1.05rem]">{f.title}</h3>
                  <p className="text-[.85rem] text-muted mt-1.5 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>

            {/* trust bar */}
            <div className="mt-8 bg-navy rounded-2xl px-6 py-5 flex flex-wrap gap-x-8 gap-y-3 justify-center text-white text-[.9rem] font-semibold">
              {trust.map((t) => <span key={t} className="inline-flex items-center gap-2"><span className="text-brand-yellow">✓</span> {t}</span>)}
            </div>
          </div>

          {/* sticky sidebar */}
          <aside className="lg:sticky lg:top-24 h-max flex flex-col gap-4" id="quote">
            <ManVanForm />
            <div className="bg-navy rounded-2xl p-5 flex flex-col gap-3">
              <a href="tel:+447847117933" className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-display font-bold px-5 py-3 rounded-xl hover:bg-white/10 transition">📞 Call +44 7847 117933</a>
              <a href="https://wa.me/447847117933" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-whatsapp text-[#05371a] font-display font-bold px-5 py-3 rounded-xl hover:-translate-y-0.5 transition">💬 WhatsApp Us</a>
            </div>
            <div className="bg-white border border-line rounded-2xl p-4 flex items-center gap-3">
              <span className="text-brand-yellow text-2xl">★</span>
              <div><div className="font-display font-bold text-ink">4.9 Stars</div><div className="text-[.82rem] text-muted">Based on 150+ reviews</div></div>
            </div>
            <div className="bg-white border border-line rounded-2xl p-5">
              <div className="font-display font-bold text-ink mb-3">Areas Covered</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {areas.map((a) => <span key={a} className="flex items-center gap-1.5 text-[.85rem] text-ink"><span className="text-brand-blue text-[.7rem]">➤</span> {a}</span>)}
              </div>
            </div>
            <div className="bg-white border border-line rounded-2xl p-5">
              <p className="text-ink text-[.92rem] italic">"Excellent service, arrived on time and finished early."</p>
              <div className="mt-3 flex items-center gap-2"><span className="w-9 h-9 rounded-full bg-brand-blue text-white grid place-items-center font-bold text-[.8rem]">M</span><div><div className="font-bold text-ink text-[.9rem]">Mike</div><div className="text-[.78rem] text-brand-blue">Manchester</div></div></div>
            </div>
          </aside>
        </div>
      </section>

      {/* transparent pricing */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5">
          <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.5rem)] tracking-[-0.02em]">Transparent Pricing Based on Your Move</h2>
          <div className="w-16 h-1 bg-brand-blue rounded mt-3 mb-5" />
          <p className="text-muted max-w-[70ch] leading-relaxed">Our pricing is based on the size of your move and the crew required—not the clock. Every package includes the appropriate van, experienced movers, fuel and standard moving equipment. No hidden fees, no surprise charges.</p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="bg-brand-blue text-white text-[.8rem] uppercase tracking-wide">
                  <th className="px-5 py-4 font-bold">Move Size</th><th className="px-5 py-4 font-bold">Start From</th><th className="px-5 py-4 font-bold">Van Type</th><th className="px-5 py-4 font-bold">Crew</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((p, i) => (
                  <tr key={p.size} className={i % 2 ? "bg-soft" : "bg-white"}>
                    <td className="px-5 py-4 font-display font-bold text-ink">{p.size}</td>
                    <td className="px-5 py-4"><span className="font-display font-black text-brand-blue text-[1.6rem] border-b-2 border-brand-yellow pb-0.5">{p.price}</span></td>
                    <td className="px-5 py-4 text-muted">{p.van}</td>
                    <td className="px-5 py-4"><span className="inline-flex items-center gap-1.5 text-ink font-semibold text-[.9rem]">👤 {p.crew}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* how it works — shared 4-step design */}
      <HowItWorks />

      {/* FAQ */}
      <section className="bg-softblue py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5">
          <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.5rem)]">Questions About Man and Van</h2>
          <p className="text-muted mt-2">Everything you need to know about moving home with Van Hero. Still got a question? Just call or message us.</p>
          <div className="mt-8 max-w-[760px] flex flex-col gap-2">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-white rounded-xl border border-line px-5 py-4">
                <summary className="flex items-center gap-3 cursor-pointer list-none font-display font-bold text-ink">
                  <span className="text-muted2 text-[.9rem]">{String(i + 1).padStart(2, "0")}.</span>
                  <span className="flex-1">{f.q}</span>
                  <span className="text-brand-blue text-xl transition group-open:rotate-45">+</span>
                </summary>
                <p className="text-muted text-[.92rem] mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* moving & packing tips */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5">
          <h2 className="font-display font-black text-ink text-[clamp(1.8rem,4vw,2.5rem)] text-center">Moving &amp; Packing Tips</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {posts.map((p) => (
              <a key={p.title} href={p.link} className="group bg-white border border-line rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-30px_rgba(3,5,65,.45)] transition duration-300">
                <div className="relative h-[190px] overflow-hidden">
                  <Image src={p.img} alt={p.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-ink text-[1.1rem] leading-snug">{p.title}</h3>
                  <p className="text-[.9rem] text-muted mt-2 leading-relaxed">{p.excerpt}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-2 bg-brand-blue text-white rounded-lg text-[.8rem] px-4 py-2 font-display font-bold w-max">➜ Read Guide</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* feedback */}
      <Testimonials />

      <Newsletter />
      <Footer />
    </main>
  );
}
