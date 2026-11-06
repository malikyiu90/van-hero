import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "House Clearance in UK — Van Hero",
  description: "Fast, professional house clearance across the UK. Fully insured licensed waste carriers who recycle 85%+ of everything collected. Waste transfer note on every job.",
};

const data = {
  label: "House Clearance",
  pill: "House Clearance in UK",
  title: "House Clearance",
  intro: "From single rooms to full property clearances, Van Hero provides fast, professional house clearance services across UK. We're fully insured, licensed waste carriers who recycle over 85% of everything we collect. Every clearance includes a waste transfer note, giving you complete peace of mind that your items are disposed of responsibly.",
  heroImage: "/services/clearance-room.webp",
  heroBadge: "Licensed Waste Carrier",
  sectionHeading: "UK's Trusted House Clearance Company",
  sectionImage: "/services/clearance.webp",
  sectionParas: [
    "Van Hero takes the stress out of house clearance, whatever the size of the job. Whether it's a single room, a flat, or a full multi-storey property, our local team arrives with the right vehicles, equipment and experience to clear your property quickly, efficiently and with respect.",
    "As a licensed waste carrier, we ensure everything we remove is handled responsibly and in full compliance with UK regulations. We recycle over 85% of the items we collect, donate reusable furniture to local charities wherever possible, and dispose of non-recyclable or hazardous waste through approved specialist facilities. Every clearance includes a waste transfer note, giving you complete peace of mind that your waste has been dealt with legally and responsibly.",
    "Whether you're clearing a family home, preparing a property for sale or rent, or managing a probate or bereavement clearance, our friendly team treats every property with care and professionalism. We'll do the hard work so you can focus on what comes next.",
  ],
  features: [
    { icon: "🏠", title: "House Clearance", text: "Whether it's a single room, flat, or an entire house, we'll clear furniture, appliances, unwanted items, and general clutter. Every property is left swept, tidy and ready for sale, letting or hand over." },
    { icon: "🌿", title: "Garden Clearance", text: "We clear overgrown gardens, green waste, sheds, fencing, patio furniture and general outdoor rubbish, leaving your outdoor space clean, tidy and ready to enjoy again." },
    { icon: "🗑️", title: "Rubbish Removal", text: "From a single bulky item to a full van load, we'll collect and responsibly dispose of unwanted household or commercial waste — no skip hire, no permits, and no heavy lifting required." },
    { icon: "♻️", title: "85%+ Recycled", text: "We recycle over 85% of everything we collect and donate reusable furniture to local charities wherever possible." },
    { icon: "📄", title: "Waste Transfer Note", text: "Every clearance includes a waste transfer note, so you're never liable for where your waste ends up." },
    { icon: "🕊️", title: "Probate & Bereavement", text: "We handle probate and bereavement clearances with care and discretion, working at your pace." },
  ],
  pricingCols: ["Load Size", "Price", "Best For"],
  pricingIntro: "Simple, fixed pricing by van load — agreed before any work starts. No skip hire, no permits, no hidden charges.",
  pricing: [
    ["Quarter Load", "£80", "A few bulky items or around 15–20 bin bags"],
    ["Half Load", "£149", "A bedroom, garage or small flat clearance"],
    ["Full Van", "£249", "Full house clearances or large furniture collections"],
    ["Multi-Van", "Custom", "Probate clearances, commercial properties and large estates"],
  ],
  steps: [
    { n: "01", title: "Get a Quote", text: "Fill in the quick form or call us. Tell us the rough size of the job and your postcode." },
    { n: "02", title: "Pick Your Slot", text: "Choose a day that works — including same-day and weekends. We confirm in writing." },
    { n: "03", title: "Job Done", text: "We clear, load, and sweep up — then send your waste transfer note. Nothing left behind." },
  ],
  faqHeading: "Questions About House Clearance",
  faqIntro: "Everything you need to know about clearing a property with Van Hero. Still got a question? Just call or message us.",
  faqs: [
    { q: "How much does a house clearance cost in UK?", a: "It depends on how much there is to clear. We price by van load — from £80 for a quarter load up to a full house — with a clear fixed price agreed before any work starts." },
    { q: "Do you provide a waste transfer note?", a: "Yes, on every job. As a licensed waste carrier we give you a waste transfer note as standard, so you're never liable for where your waste ends up." },
    { q: "What happens to the items you clear?", a: "We recycle 85%+ of everything we collect — reusable furniture goes to local charities where we can, recyclables are sorted, and only what's genuinely unusable goes to licensed disposal." },
    { q: "Can you do same-day or urgent clearances?", a: "Often, yes. We keep slots open for urgent end-of-tenancy and same-day jobs — call us and we'll tell you the soonest we can get to you." },
    { q: "Do you handle bereavement and probate clearances?", a: "Yes, with care and discretion. We're used to clearing homes after a loss or for probate, and we'll work at your pace and set aside anything you want kept." },
    { q: "Which areas do you cover for house clearance?", a: "right across the UK — including Rugby, Leamington Spa, Warwick, Kenilworth, Nuneaton, Bedworth and Solihull." },
  ],
  form: { pill: "★ House Clearance", title: "Clearances from £80", subtitle: "Licensed, insured, 85%+ recycled." },
};

export default function Page() {
  return <ServicePage data={data} />;
}
