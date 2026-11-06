import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Furniture Removal & Delivery — Van Hero",
  description: "Safe, reliable furniture collection and delivery across the UK from £25. Single items, marketplace pickups, heavy and specialist furniture — fully insured.",
};

const data = {
  label: "Furniture Removals",
  pill: "Furniture Moves",
  title: "Furniture Removal & Delivery",
  intro: "Need to move a sofa, wardrobe, dining table or bed? VAN Hero provides safe, reliable furniture collection and delivery across whole UK, with prices from just £45. Whether it's a single purchase or a valuable family piece, we'll get it there safely.",
  heroImage: "/services/furniture-wrapped.webp",
  heroBadge: "Same Day Available",
  sectionHeading: "Single-Item Moves Made Simple",
  sectionImage: "/services/furniture-boxes.webp",
  sectionParas: [
    "Moving one piece of furniture shouldn't mean hiring an entire removal company.",
    "Whether you've found a bargain on Facebook Marketplace, bought something on eBay, or need to transport a family heirloom, VAN Hero offers a straightforward furniture delivery service throughout Whole UK.",
    "From wardrobes and king-size beds to American fridge freezers and three-piece suites, we handle the awkward, bulky items most cars simply can't. Every item is carefully loaded, protected during transport and positioned exactly where you need it.",
  ],
  features: [
    { icon: "🛋️", title: "Single-Item Collection", text: "Perfect for collecting furniture from retailers, auction houses or private sellers." },
    { icon: "🛒", title: "Marketplace Collections", text: "Fast, reliable delivery for purchases from Facebook Marketplace, Gumtree and eBay." },
    { icon: "🎹", title: "Heavy Item Specialists", text: "Experienced with pianos, range cookers, American fridge freezers and other oversized furniture." },
    { icon: "🔧", title: "Furniture Assembly", text: "We can dismantle and rebuild beds, wardrobes and larger furniture where required." },
    { icon: "⚡", title: "Same-Day Availability", text: "Need it moved today? We offer same-day collections whenever availability allows." },
    { icon: "✅", title: "Fully Insured Professionals", text: "Goods in Transit and Public Liability cover give complete peace of mind throughout your move." },
  ],
  pricingCols: ["Item Type", "Start From", "Best For"],
  pricingIntro: "Clear, upfront pricing based on the size of the item and the crew needed — not the clock. Every job includes the right van, experienced movers, fuel and protective equipment.",
  pricing: [
    ["Small Item", "£25", "Chairs, bedside cabinets, coffee tables (1 mover, transit van)"],
    ["Medium Furniture", "£65", "Sofas, beds, wardrobes (2 movers, long-wheelbase van)"],
    ["Heavy & Specialist", "£110", "Pianos, American fridge freezers, range cookers (3 movers, specialist kit)"],
  ],
  steps: [
    { n: "01", title: "Send Us a Photo", text: "Send us a quick photo of the furniture via WhatsApp so we can recommend the right vehicle and provide an accurate quote." },
    { n: "02", title: "Book a Slot", text: "Pick a collection time that suits you. Our team arrives fully equipped and ready to complete the move safely." },
    { n: "03", title: "Relax & Move", text: "We'll carefully collect, transport and place your furniture where you want it, without the stress." },
  ],
  faqHeading: "Questions About Furniture Removal",
  faqIntro: "Everything you need to know about moving furniture with Van Hero. Still got a question? Just call or message us.",
  faqs: [
    { q: "Can you move a single piece of furniture?", a: "Yes. We can collect and deliver sofas, wardrobes, beds, tables, appliances and other individual items across the UK and beyond." },
    { q: "Will my furniture be protected during the move?", a: "Yes. We use protective coverings, secure loading methods and careful handling to help prevent scratches, marks and damage in transit." },
    { q: "Can you dismantle and reassemble furniture?", a: "Yes. Where required, our team can dismantle suitable furniture before transport and reassemble it at the delivery address." },
    { q: "How much does it cost to move a single item of furniture?", a: "Single-item moves start from £25, with the price depending on the size of the item, the access at both ends, and the distance. You'll get a clear fixed quote before we start — no hidden fees." },
    { q: "Can you collect from a shop or Facebook Marketplace seller?", a: "Yes — that's one of our most popular jobs. We collect from stores, retail parks, or a private seller's address and deliver straight to your door, across the UK, Rugby and Warwick." },
    { q: "Can you move heavy or awkward items like a piano or an American fridge?", a: "Yes. Our crews are equipped for heavy and oversized items — pianos, range cookers, American fridge-freezers and solid-oak furniture — with the right kit and a multi-person lift where needed." },
  ],
  form: { pill: "★ Furniture Moves", title: "Move a Single Item from £25", subtitle: "Sofas, beds, wardrobes and awkward pieces." },
};

export default function Page() {
  return <ServicePage data={data} />;
}
