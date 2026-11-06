import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Removals from UK to Europe — Van Hero",
  description: "Door-to-door removals from the UK to France, Germany, Spain, Italy and beyond. Customs paperwork handled, fixed pricing, fully insured international moves.",
};

const data = {
  label: "European Moves",
  pill: "UK to Europe Removals",
  title: "Removals from UK to Europe",
  intro: "Door-to-door moves from UK to France, Germany, Spain, Italy and beyond.",
  heroImage: "/services/european-road.webp",
  heroBadge: "Door-to-Door",
  sectionHeading: "Door-to-Door European Removals from UK",
  sectionImage: "/services/european.webp",
  sectionParas: [
    "Moving abroad is more than just a logistical challenge; it's the start of a new chapter. At Van Hero, we specialize in bridging the gap between your life in the UK and your new destination in Europe. Whether you're heading to a coastal villa in Spain or a city apartment in Berlin, our \"Capable Care\" approach ensures your belongings are handled with the same respect we'd give our own family's possessions.",
    "We manage the entire international journey. From navigating post-Brexit customs documentation to coordinating with our trusted local partner networks across the continent, our UK-wide team takes the weight off your shoulders. We offer a seamless, door-to-door service that eliminates the stress of multi-modal transport and complex storage arrangements.",
  ],
  features: [
    { icon: "📋", title: "Customs Docs", text: "Complete handling of all necessary customs and transit paperwork for cross-border transit." },
    { icon: "🚚", title: "Door-to-Door", text: "One van, one team, from your front door in the UK to your new address in Europe." },
    { icon: "💷", title: "Fixed-Price", text: "Clear, upfront quotes with no hidden fuel surcharges or surprise international fees." },
    { icon: "📦", title: "Quality Packing", text: "Export-grade materials to ensure your items survive the longer haul of continental roads." },
    { icon: "🤝", title: "Partner Network", text: "Local assistance across Europe to handle narrow streets or complex parking logistics." },
    { icon: "🛡️", title: "Insured & Trained", text: "Comprehensive goods-in-transit insurance tailored specifically for international moves." },
  ],
  pricingCols: ["Package", "Average Price", "Includes"],
  pricingIntro: "Clear, fixed international pricing — no hidden fuel surcharges or surprise cross-border fees. Final price confirmed after a quick survey of your move.",
  pricing: [
    ["Small Move", "£1,800", "Studios / shared loads · up to 500 cu. ft · customs support · tracking included"],
    ["Family Move", "£3,200", "Standard 3-bed house · up to 1500 cu. ft · full packing service · priority transit"],
    ["Bespoke", "Custom", "Large estates or specialty items (pianos, etc.)"],
  ],
  steps: [
    { n: "01", title: "Tell Us Destination", text: "Get a free, no-obligation video survey or in-person quote in the UK." },
    { n: "02", title: "Sign Paperwork", text: "We prepare your inventory and customs documents, then confirm your fixed price and dates." },
    { n: "03", title: "Relax & Move", text: "We collect, transport and deliver door-to-door, straight to your new address in Europe." },
  ],
  faqHeading: "Common Questions About European Moving",
  faqIntro: "Everything you need to know about moving from the UK to Europe. Still got a question? Just call or message us.",
  faqs: [
    { q: "How long will my European move take?", a: "Delivery times vary depending on the destination, route, load size and customs requirements. Once we understand your move, we will explain the expected schedule and keep you informed throughout the journey." },
    { q: "Do you offer a door-to-door European removals service?", a: "Yes. We can collect your belongings from your property in the UK, transport them safely across Europe and deliver them directly to your new address. Packing and loading support can also be included when required." },
    { q: "Are my belongings protected during the journey?", a: "Your items are handled carefully, securely loaded and protected for long-distance transport. We also provide insured and tracked European removals, giving you greater reassurance while your belongings are in transit." },
    { q: "Will I have to pay import duty or customs charges?", a: "Usually not on used personal belongings, if you're genuinely relocating — every EU country offers a transfer-of-residence relief. You'll need a detailed inventory and proof of your move, which we'll help you prepare. Rules vary by country, so we'll always point you to check your destination's current requirements." },
    { q: "What paperwork do I need for a European move?", a: "Typically a detailed inventory of everything you're moving with values, proof of residence at your destination, and a customs declaration. We prepare the inventory as we pack and help you get the rest in order." },
    { q: "How far in advance should I book a European move?", a: "Allow around six to eight weeks. That gives time for a survey, the inventory, the paperwork and the transport itself, without anything being rushed at the border." },
  ],
  form: { pill: "★ European Moves", title: "Get Your European Move Quote", subtitle: "Door-to-door, customs handled, fixed price." },
};

export default function Page() {
  return <ServicePage data={data} />;
}
