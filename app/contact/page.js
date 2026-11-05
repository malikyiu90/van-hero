import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import ManVanForm from "@/components/ManVanForm";

export const metadata = {
  title: "Contact Van Hero — Coventry Removals",
  description: "Get in touch with Van Hero for a free, no-obligation quote. Call, WhatsApp or email our Coventry team. Mon–Sat 8:00–18:00, Sun 10:00–14:00.",
};

export default function ContactPage() {
  return (
    <main>
      <Nav />
      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <span className="text-ink font-semibold">Contact</span>
        </div>
      </div>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-wrap px-5">
          <div className="max-w-[640px]">
            <span className="pill">Get In Touch</span>
            <h1 className="font-display font-black text-ink text-[clamp(2.2rem,5vw,3.4rem)] tracking-[-0.02em] mt-4">Let's Plan Your Move</h1>
            <p className="text-muted mt-3 text-[1.05rem]">Call, WhatsApp or drop us your details and we'll come back with a clear, fixed, no-obligation quote. No call centres, no pushy sales — just a local Coventry team ready to help.</p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 mt-10 items-start">
            {/* contact details */}
            <div className="flex flex-col gap-4">
              <a href="tel:+447847117933" className="flex items-center gap-4 bg-white border border-line rounded-2xl p-5 hover:-translate-y-0.5 transition">
                <span className="w-12 h-12 rounded-xl bg-brand-yellow/20 text-ink grid place-items-center text-xl">📞</span>
                <div><div className="font-display font-bold text-ink">Call Us</div><div className="text-brand-blue font-semibold">+44 7847 117933</div></div>
              </a>
              <a href="https://wa.me/447847117933" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white border border-line rounded-2xl p-5 hover:-translate-y-0.5 transition">
                <span className="w-12 h-12 rounded-xl bg-whatsapp/15 grid place-items-center text-xl">💬</span>
                <div><div className="font-display font-bold text-ink">WhatsApp</div><div className="text-[#05371a] font-semibold">Message us any time</div></div>
              </a>
              <a href="mailto:info@vanhero.online" className="flex items-center gap-4 bg-white border border-line rounded-2xl p-5 hover:-translate-y-0.5 transition">
                <span className="w-12 h-12 rounded-xl bg-softblue grid place-items-center text-xl">✉️</span>
                <div><div className="font-display font-bold text-ink">Email</div><div className="text-brand-blue font-semibold">info@vanhero.online</div></div>
              </a>
              <div className="flex items-center gap-4 bg-white border border-line rounded-2xl p-5">
                <span className="w-12 h-12 rounded-xl bg-softblue grid place-items-center text-xl">📍</span>
                <div><div className="font-display font-bold text-ink">Visit / Post</div><div className="text-muted text-[.92rem]">Unit 14, Herald Business Park, Golden Acres Lane, Coventry, CV3 2SY</div></div>
              </div>
              <div className="flex items-center gap-4 bg-white border border-line rounded-2xl p-5">
                <span className="w-12 h-12 rounded-xl bg-softblue grid place-items-center text-xl">🕗</span>
                <div><div className="font-display font-bold text-ink">Opening Hours</div><div className="text-muted text-[.92rem]">Mon–Sat: 8:00–18:00 · Sun: 10:00–14:00</div></div>
              </div>
              <div className="relative w-full rounded-2xl overflow-hidden border border-line aspect-[16/9]">
                <iframe title="Van Hero location — Coventry" src="https://www.google.com/maps?q=Coventry,+UK&z=11&output=embed" className="absolute inset-0 w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>

            {/* form */}
            <div className="lg:sticky lg:top-24">
              <ManVanForm pill="★ Get In Touch" title="Request Your Free Quote" subtitle="Tell us about your move and we'll be right back." />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
