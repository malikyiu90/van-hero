import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Local Handyman Services Coventry — Van Hero",
  description: "Skilled local tradesmen from £45/hour. Flat-pack assembly, TV mounting, shelves, blinds, taps and small repairs. Same-day available, fully insured.",
};

const data = {
  label: "Handyman",
  pill: "Available Today",
  title: "Handyman Services",
  intro: "Skilled local tradesmen from just £45/hour. No job too small.",
  heroImage: "/services/manvan-hero.webp",
  heroBadge: "Available Today",
  sectionHeading: "UK's Trusted Local Handyman",
  sectionParas: [
    "From the historic streets of Earlsdon to the modern homes of Cheylesmore, Van Hero provides dependable, high-quality home maintenance for busy families and professionals across the city.",
    "Shelves, curtain poles and blinds, TV mounting, flat-pack assembly, door adjustments, filling and painting, sealant and grouting, tap and loo-seat swaps, fence and gate repairs, and furniture reassembly after a move — if it's on your list, our insured local team can handle it.",
  ],
  features: [
    { icon: "🪛", title: "Flat-Pack Assembly", text: "We build flat-pack furniture properly and fix tall units safely to the wall." },
    { icon: "📺", title: "TV & Wall Mounting", text: "TVs, mirrors, shelves and pictures mounted securely and level." },
    { icon: "🪟", title: "Blinds & Curtains", text: "Blinds, curtain poles and rails fitted cleanly and straight." },
    { icon: "🎨", title: "Filling & Painting", text: "Small painting jobs, filling, sealant and grouting done to a neat finish." },
    { icon: "🚰", title: "Taps & Fittings", text: "Tap changes, loo-seat swaps, light fittings and door handles sorted." },
    { icon: "🛠️", title: "Repairs & Reassembly", text: "Fence and gate repairs, door adjustments and furniture reassembly after a move." },
  ],
  pricingCols: ["Popular Job", "Fixed Price"],
  pricingIntro: "Clear fixed prices for popular jobs, or hourly rates for a list of tasks — £45/hour for one handyman, or £75/hour for a two-person Elite team. Book several small jobs in one visit to save.",
  pricing: [
    ["Flat-Pack Assembly", "£35"],
    ["TV Mounting", "£49"],
    ["Mirror Hanging", "£25"],
    ["Tap Change", "£65"],
    ["Door Handle", "£30"],
    ["Light Fitting", "£45"],
    ["Blind Fitting", "£35"],
    ["Curtain Rail", "£35"],
  ],
  steps: [
    { n: "01", title: "Get a Quote", text: "Fill out our quick form or call us for a personalized estimate." },
    { n: "02", title: "Pick Your Slot", text: "Our pro team shows up on time with everything needed for the work." },
    { n: "03", title: "Job Done", text: "Professional results, no mess left behind." },
  ],
  faqHeading: "Frequently Asked Questions About Handyman",
  faqIntro: "Everything you need to know about our handyman service. Still got a question? Just call or message us.",
  faqs: [
    { q: "What kind of jobs does your handyman service cover?", a: "Shelves, curtain poles and blinds, TV mounting, flat-pack assembly, door adjustments, filling and painting, sealant and grouting, tap and loo-seat swaps, fence and gate repairs, and furniture reassembly after a move." },
    { q: "Can I book several small jobs in one visit?", a: "Yes — and it's usually the cheapest way to do it. Write a list of everything that needs doing and we'll work through it in a single visit rather than several call-outs." },
    { q: "Do you assemble flat-pack furniture?", a: "Yes, it's one of our most-booked jobs. We build it properly and fix tall units to the wall safely — especially important where there are children in the home." },
    { q: "Can you do gas or electrical work?", a: "Only where it's legal to. Gas work must be done by a Gas Safe registered engineer, and notifiable electrical work by a registered electrician — so we'll tell you honestly if a job needs a specialist instead." },
    { q: "Are you insured?", a: "Yes. Our handyman service carries public liability insurance, so your home is protected if anything goes wrong." },
    { q: "Which areas do you cover?", a: "Coventry and the surrounding Warwickshire area — including Rugby, Leamington Spa, Warwick, Kenilworth, Nuneaton and Bedworth." },
  ],
  form: { pill: "★ Handyman", title: "Handyman from £45/hour", subtitle: "Same-day available, fully insured." },
};

export default function Page() {
  return <ServicePage data={data} />;
}
