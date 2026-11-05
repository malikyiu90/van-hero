import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Residential Storage — Van Hero",
  description: "Secure, clean and dry residential storage with free collection and 24/7 access. Perfect for moving home, decluttering or renovating. From £14/week, fully insured.",
};

const data = {
  label: "Residential Storage",
  pill: "Free Collection • 24/7 Access",
  title: "Residential Storage, On Your Terms",
  intro: "Secure, clean and dry storage for your home — whether you're moving, decluttering or renovating. We'll collect your belongings from your door, store them safely and give you 24/7 access whenever you need them.",
  heroImage: "/services/storage.webp",
  heroBadge: "Free Collection",
  sectionHeading: "Residential Storage at Your Home, On Your Terms",
  sectionImage: "/services/manvan.webp",
  sectionParas: [
    "Life doesn't always fit in one place. Whether you're between homes, making room for a new arrival, renovating, or simply decluttering, our clean and individually alarmed units give your belongings a safe second home for as long as you need.",
    "Book a unit for 12+ weeks and our crew will collect from your door for free — no van hire, no heavy lifting. Everything sits inside a secure, gated, CCTV-monitored facility with 24/7 access, so you can come and go whenever suits you.",
  ],
  features: [
    { icon: "🚚", title: "Free Collection", text: "Free collection worth up to £549. No van hire needed." },
    { icon: "🕒", title: "24/7 Access", text: "Your own PIN for access 365 days a year — come and go as often as you like." },
    { icon: "🚨", title: "Individually Alarmed", text: "Every unit is individually alarmed inside a secure, gated facility." },
    { icon: "📹", title: "CCTV Monitored", text: "The whole site is protected by 24-hour CCTV for complete peace of mind." },
    { icon: "🛡️", title: "Contents Insured", text: "Contents insured up to £50,000 for complete peace of mind." },
    { icon: "📅", title: "Flexible Terms", text: "Store for a week or a year — no long lock-ins, only pay for what you use." },
  ],
  pricingCols: ["Unit Size", "Price", "Ideal For"],
  pricingIntro: "Simple weekly pricing — you only pay for the space you need, with no long contracts. Not sure what size suits you? Call us and we'll help you judge it.",
  pricing: [
    ["25 sq ft (5×5)", "£14/wk", "One room, student storage · ~25–35 medium boxes"],
    ["50 sq ft (5×10)", "£22/wk", "One-bed flat · bed, sofa, white goods, ~60–80 boxes"],
    ["100 sq ft (10×10)", "£35/wk", "Small two-bed house · furniture from a couple of rooms, ~100 boxes"],
    ["150 sq ft (15×10)", "£49/wk", "Large three-to-four-bed family home · full house move"],
  ],
  faqHeading: "Questions About Residential Storage",
  faqIntro: "Everything you need to know about storing your home with Van Hero. Still got a question? Just call or message us.",
  faqs: [
    { q: "How much does residential storage cost?", a: "Units start from £14 a week for a small 25 sq ft unit, up to our largest 150 sq ft unit. You only pay for the space you need, with no long contracts." },
    { q: "Can I access my unit any time?", a: "Yes. You get a unique PIN and 24/7 access, 365 days a year — come and go as often as you like." },
    { q: "Are my belongings insured?", a: "Yes, every unit is covered up to £50k, and the whole site is protected by 24-hour CCTV and individual unit alarms." },
    { q: "Is there a minimum term?", a: "No long lock-ins. You can store for as little as a week or as long as you need, and only pay for the time you use." },
    { q: "Do you collect my belongings for me?", a: "Yes. Book a unit for 12+ weeks and our crew will collect from your door and bring everything to our secure Coventry site — fully insured, at no extra cost." },
  ],
  form: { pill: "★ Residential Storage", title: "Home Storage from £14/week", subtitle: "Free collection, 24/7 access, fully insured." },
};

export default function Page() {
  return <ServicePage data={data} />;
}
