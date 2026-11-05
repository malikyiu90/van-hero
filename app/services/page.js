import Image from "next/image";
import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { serviceList } from "@/lib/serviceList";

export const metadata = {
  title: "Our Services — Van Hero",
  description: "From single items to full-scale commercial relocations, Van Hero handles house removals, man & van, storage, packing, courier, clearance and more across the UK.",
};

export default function ServicesPage() {
  return (
    <main>
      <Nav />
      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <span className="text-ink font-semibold">Services</span>
        </div>
      </div>

      <section className="bg-navy py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5 text-center max-w-[640px]">
          <span className="pill">What We Do</span>
          <h1 className="font-display font-black text-white text-[clamp(2.2rem,5vw,3.4rem)] tracking-[-0.02em] mt-4">Our Services</h1>
          <p className="text-white/75 mt-3 text-[1.05rem]">From single items to full-scale commercial relocations, we handle the heavy lifting so you don't have to. Explore everything Van Hero offers below.</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-wrap px-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((s) => (
            <a key={s.slug} href={s.slug} className="group bg-white border border-line rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-30px_rgba(3,5,65,.45)] transition duration-300">
              <div className="relative h-[180px] overflow-hidden">
                <Image src={s.img} alt={s.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 grid place-items-center text-[1.3rem] shadow">{s.icon}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="font-display font-bold text-ink text-[1.2rem]">{s.title}</h2>
                <p className="text-[.9rem] text-muted mt-1.5 leading-relaxed">{s.blurb}</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-brand-blue font-display font-bold text-[.82rem] uppercase tracking-wide">
                  View Service <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
