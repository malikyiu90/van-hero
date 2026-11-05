import Image from "next/image";
import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog";

export const metadata = {
  title: "Moving Wisdom — The Van Hero Blog",
  description: "Practical, no-nonsense moving advice from the crew who does it every day — packing, pricing, student moves, storage, office moves, clearance and more.",
};

export default function BlogsPage() {
  return (
    <main>
      <Nav />
      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <span className="text-ink font-semibold">Blogs</span>
        </div>
      </div>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-wrap px-5">
          <div className="max-w-[640px]">
            <span className="pill">Moving Wisdom</span>
            <h1 className="font-display font-black text-ink text-[clamp(2.1rem,5vw,3.3rem)] tracking-[-0.02em] mt-4">From the Van Hero Blog</h1>
            <p className="text-muted mt-3 text-[1.05rem]">Practical, no-nonsense moving advice from the crew who does it every day. {blogPosts.length} guides and counting.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {blogPosts.map((p) => (
              <a key={p.slug} href={`/blog/${p.slug}`} className="group bg-white border border-line rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-30px_rgba(3,5,65,.45)] transition duration-300">
                <div className="relative h-[190px] overflow-hidden">
                  <Image src={p.img} alt={p.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 bg-white/95 text-ink text-[.68rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow">{p.cat}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display font-bold text-ink text-[1.1rem] leading-snug">{p.title}</h2>
                  <p className="text-[.9rem] text-muted mt-2 leading-relaxed">{p.excerpt}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-2 text-brand-blue font-display font-bold text-[.82rem] uppercase tracking-wide">
                    Read Guide <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
