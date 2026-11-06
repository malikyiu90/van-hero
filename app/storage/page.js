import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Secure Storage with Free Collection — Van Hero",
  description: "Secure, clean and dry storage units from £14/week with free collection and 24/7 access. Individually alarmed, CCTV monitored, contents insured up to £50,000.",
};

const data = {
  label: "Storage",
  pill: "From 25–150 sq ft • Free Collection",
  title: "Secure Storage with Free Collection",
  intro: "Secure, clean and dry storage with FREE collection. Whether you're moving home, decluttering or storing business stock, we'll collect your items, store them safely and give you 24/7 access.",
  heroImage: "/services/storage-warehouse.webp",
  heroBadge: "Free Collection",
  sectionHeading: "Find the Perfect Storage Unit Size",
  sectionImage: "/services/storage-boxes.webp",
  sectionParas: [
    "Our clean, dry and individually alarmed units are perfect for moving home, decluttering, renovating or storing business stock. Book a unit for 12+ weeks and we'll collect your belongings from your door for free — no van hire needed.",
    "Every unit sits inside a secure, gated and CCTV-monitored facility with 24/7 access, so you can come and go whenever suits you. You only pay for the space you need, with no long lock-in contracts.",
  ],
  features: [
    { icon: "🚚", title: "Free Collection", text: "Free collection worth up to £549. No van hire needed." },
    { icon: "🕒", title: "24/7 Access", text: "Your own PIN for access 365 days a year — come and go as often as you like." },
    { icon: "🚨", title: "Individually Alarmed Units", text: "Every unit is individually alarmed inside a secure, gated facility." },
    { icon: "📹", title: "CCTV Monitored", text: "The whole site is protected by 24-hour CCTV for complete peace of mind." },
    { icon: "🛡️", title: "Contents Insured", text: "Contents insured up to £50,000 for complete peace of mind." },
    { icon: "📍", title: "Convenient Location", text: "Convenient UK bases with easy drive-up access, serving the whole UK." },
  ],
  pricingCols: ["Unit Size", "Price", "Ideal For"],
  pricingIntro: "Simple weekly pricing — you only pay for the space you need, with no long contracts. Not sure what size suits you? Call us and we'll help you judge it.",
  pricing: [
    ["25 sq ft (5×5)", "£14/wk", "One room, student storage · ~25–35 medium boxes"],
    ["50 sq ft (5×10)", "£22/wk", "One-bed flat · bed, sofa, white goods, ~60–80 boxes"],
    ["100 sq ft (10×10)", "£35/wk", "Small two-bed house · furniture from a couple of rooms, ~100 boxes"],
    ["125 sq ft", "£42/wk", "Larger two-to-three-bed home"],
    ["150 sq ft (15×10)", "£49/wk", "Large three-to-four-bed family home · full house move"],
  ],
  faqHeading: "Questions About Storage",
  faqIntro: "Everything you need to know about storing with Van Hero. Still got a question? Just call or message us.",
  faqs: [
    { q: "How much does storage cost in UK?", a: "Our units start from £14 a week for a small 25 sq ft unit, up to our largest 150 sq ft unit. You only pay for the space you need, with no long contracts." },
    { q: "Can I access my unit any time?", a: "Yes. You get a unique PIN and 24/7 access, 365 days a year — come and go as often as you like." },
    { q: "Are my belongings insured in storage?", a: "Yes, every unit is covered up to £50k, and the whole site is protected by 24-hour CCTV and individual unit alarms." },
    { q: "Is there a minimum storage term?", a: "No long lock-ins. You can store for as little as a week or as long as you need, and only pay for the time you use." },
    { q: "What size unit do I need?", a: "As a rough guide: 25 sq ft suits a single room, 50 sq ft a one-bed flat, 100 sq ft a two-bed house, and 150 sq ft a large family home. Not sure? Call us and we'll help you judge it." },
    { q: "Do you collect my belongings for me?", a: "Yes. Book a unit for 12+ weeks and our crew will collect from your door and bring everything to our secure the UK site — fully insured, at no extra cost." },
  ],
  form: { pill: "★ Storage", title: "Storage from £14/week", subtitle: "Free collection, 24/7 access, fully insured." },
};

export default function Page() {
  return <ServicePage data={data} />;
}
