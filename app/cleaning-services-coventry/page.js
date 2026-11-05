import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Waste Management & Recycling — Van Hero",
  description: "Eco-friendly, fully licensed waste collection and disposal across the West Midlands. EA-licensed carrier, 90% recycle rate, same-day response, fixed pricing.",
};

const data = {
  label: "Waste Management",
  pill: "Licensed Waste Carrier",
  title: "Waste Management & Recycling in UK",
  intro: "Eco-friendly, fully licensed waste collection and disposal services across the West Midlands. Reliable same-day solutions for residential and commercial requirements.",
  heroImage: "/moves/garden.webp",
  heroBadge: "Same-Day Response",
  sectionHeading: "Complete Waste Management Across UK",
  sectionImage: "/services/manvan.webp",
  sectionParas: [
    "As a fully EA-licensed waste carrier, Van Hero collects, transports and disposes of your waste safely, legally and responsibly. From a few black bags to a complete van load, we handle residential and commercial waste with no skip hire, no permits and no heavy lifting on your part.",
    "We aim to recycle or repurpose over 90% of everything we collect, sorting recyclables, donating reusable items and sending only what's genuinely unusable to licensed disposal. Every collection comes with the paperwork to prove your waste was handled correctly.",
  ],
  features: [
    { icon: "📜", title: "Licensed Carrier", text: "Fully authorized by the EA for safe and legal waste transport." },
    { icon: "♻️", title: "Eco-Friendly", text: "We aim to recycle or repurpose 90% of everything we collect." },
    { icon: "⚡", title: "Same-Day", text: "Urgent clearance needed? We offer rapid same-day response." },
    { icon: "💷", title: "Fixed Pricing", text: "No hidden fees or surprise landfill surcharges. Ever." },
    { icon: "🛡️", title: "£1M Liability", text: "Backed by £1M public liability insurance on every job." },
    { icon: "🔒", title: "GDPR Compliant", text: "Secure shredding chain for confidential documents and records." },
  ],
  pricingCols: ["Load Size", "Price", "Best For"],
  pricingIntro: "Simple, fixed pricing by load — no hidden fees or surprise landfill surcharges, ever. A clear price is agreed before any work starts.",
  pricing: [
    ["Mini Load", "£45", "Single items or a few black bags"],
    ["Standard Clearance", "£120", "Garage, garden, or small room clearances"],
    ["Full Load", "£280", "A complete 14-yard van load for major projects"],
  ],
  steps: [
    { n: "01", title: "Get a Quote", text: "Tell us the rough size of the job and your postcode — we'll give you a clear fixed price." },
    { n: "02", title: "We Collect", text: "Our EA-licensed crew arrives on time and does all the loading and lifting for you." },
    { n: "03", title: "Job Done", text: "We recycle what we can and send your waste transfer note. Nothing left behind." },
  ],
  faqHeading: "Questions About Waste Management",
  faqIntro: "Everything you need to know about our waste collection and recycling. Still got a question? Just call or message us.",
  faqs: [
    { q: "Are you a licensed waste carrier?", a: "Yes. We're fully authorised by the Environment Agency to transport and dispose of waste legally, and we provide a waste transfer note on every job." },
    { q: "What happens to the waste you collect?", a: "We aim to recycle or repurpose over 90% of everything we collect — sorting recyclables, donating reusable items, and sending only genuinely unusable waste to licensed disposal." },
    { q: "Do I need a skip or a permit?", a: "No. We do all the loading and take the waste away ourselves, so there's no skip hire, no permits and no heavy lifting for you." },
    { q: "Can you collect the same day?", a: "Often, yes. We keep slots open for urgent and same-day clearances — call us and we'll tell you the soonest we can get to you." },
    { q: "Do you handle commercial and confidential waste?", a: "Yes. We handle both residential and commercial waste, with a secure, GDPR-compliant shredding chain for confidential documents and records." },
  ],
  form: { pill: "★ Waste Management", title: "Waste Removal from £45", subtitle: "EA-licensed, 90% recycle rate." },
};

export default function Page() {
  return <ServicePage data={data} />;
}
