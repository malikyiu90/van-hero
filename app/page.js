import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { Ecosystem, Services, RecentMoves, Areas, HowItWorks, Blog } from "@/components/Sections";
import QuoteSection from "@/components/QuoteSection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Ecosystem />
      <Services />
      <RecentMoves />
      <Areas />
      <HowItWorks />
      <QuoteSection />
      <Testimonials />
      <Blog />
      <Newsletter />
      <Footer />
    </main>
  );
}
