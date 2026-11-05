import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { blogPosts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return { title: "Article — Van Hero" };
  return { title: `${post.title} — Van Hero`, description: post.excerpt };
}

export default function BlogArticle({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.cat === post.cat && p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <Nav />
      <div className="bg-white border-b border-line">
        <div className="mx-auto max-w-wrap px-5 py-3 text-[.82rem] text-muted">
          <a href="/" className="hover:text-brand-blue">Home</a> / <a href="/blogs" className="hover:text-brand-blue">Blogs</a> / <span className="text-ink font-semibold">{post.cat}</span>
        </div>
      </div>

      <article className="py-12 md:py-16">
        <div className="mx-auto max-w-[760px] px-5">
          <span className="pill">{post.cat}</span>
          <h1 className="font-display font-black text-ink text-[clamp(2rem,5vw,3rem)] tracking-[-0.02em] mt-4 leading-[1.08]">{post.title}</h1>
          <div className="mt-4 flex items-center gap-2 text-[.85rem] text-muted">
            <span className="w-7 h-7 rounded-full bg-brand-yellow grid place-items-center font-display font-black text-ink text-[.7rem]">VH</span>
            Van Hero · Moving Wisdom
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] my-8 shadow-[0_30px_60px_-34px_rgba(11,27,74,.5)]">
            <Image src={post.img} alt={post.title} fill sizes="(max-width:800px) 100vw, 760px" className="object-cover" priority />
          </div>

          <div className="flex flex-col gap-5 text-[1.05rem] text-[#3c4454] leading-relaxed">
            {post.body.map((para, i) => <p key={i}>{para}</p>)}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-navy rounded-2xl p-7 text-center">
            <h2 className="font-display font-bold text-white text-[1.4rem]">Need a hand with your move?</h2>
            <p className="text-white/75 mt-2">Get a free, fixed quote from Coventry's trusted movers — no obligation.</p>
            <div className="mt-5 flex gap-3 justify-center flex-wrap">
              <a href="/contact" className="inline-flex items-center justify-center bg-brand-yellow text-ink font-display font-bold px-6 py-3 rounded-xl hover:-translate-y-0.5 transition">Get a Free Quote →</a>
              <a href="tel:+447847117933" className="inline-flex items-center justify-center border-2 border-white/40 text-white font-display font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition">Call +44 7847 117933</a>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-soft py-14">
          <div className="mx-auto max-w-wrap px-5">
            <h2 className="font-display font-black text-ink text-[1.6rem] tracking-[-0.02em] mb-6">More on {post.cat}</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <a key={p.slug} href={`/blog/${p.slug}`} className="group bg-white border border-line rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 transition">
                  <div className="relative h-[150px] overflow-hidden">
                    <Image src={p.img} alt={p.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-ink text-[1rem] leading-snug">{p.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
      <Footer />
    </main>
  );
}
