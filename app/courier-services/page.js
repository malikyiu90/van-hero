import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Reliable Courier Services Across the UK — Van Hero",
  description: "Urgent same-day delivery across the UK and scheduled multi-drop runs across Europe. Collection within 60 minutes, fully tracked and insured.",
};

const data = {
  label: "Courier Services",
  pill: "UK · Europe",
  title: "Reliable Courier Services Across UK",
  intro: "Whether it's urgent same-day delivery across UK or scheduled multi-drop contract runs throughout Europe, our vetted hero fleet handles it with precision.",
  heroImage: "/services/manvan-hero.webp",
  heroBadge: "Collection in 60 Minutes",
  sectionHeading: "Courier Solutions Built for Whole UK",
  sectionImage: "/moves/furniture.webp",
  sectionParas: [
    "From a single urgent document to a full pallet of stock, our vetted driver fleet collects fast and delivers direct — no hubs, no sorting depots, no delays. Every job is tracked from collection to delivery and fully insured in transit.",
    "We handle same-day and overnight parcels, multi-drop routes, international shipments and scheduled contract runs for businesses — at clear, fixed rates with no surprise surcharges.",
  ],
  features: [
    { icon: "⚡", title: "Same-Day", text: "Urgent direct delivery across the UK. Collection within 60 minutes." },
    { icon: "🌙", title: "Next-Day UK", text: "Reliable overnight delivery for non-urgent parcels and pallets." },
    { icon: "🗺️", title: "Multi-Drop", text: "Efficient route planning for multiple deliveries in one run." },
    { icon: "🌍", title: "International", text: "Worldwide shipping with customs assistance and tracking." },
    { icon: "🔁", title: "Contract Runs", text: "Scheduled daily or weekly routes at fixed, discounted rates." },
    { icon: "🖥️", title: "IT Relocation", text: "Specialist transport for delicate servers and IT equipment." },
  ],
  steps: [
    { n: "01", title: "Get a Quote", text: "Fill out our quick form or call us for a personalized estimate." },
    { n: "02", title: "Pick Your Slot", text: "Choose same-day, next-day or a scheduled slot that works for you." },
    { n: "03", title: "Job Done", text: "Our vetted driver collects and delivers your item safely, fully tracked door to door." },
  ],
  faqHeading: "Questions About Our Courier Service",
  faqIntro: "Everything you need to know about our courier runs. Still got a question? Just call or message us.",
  faqs: [
    { q: "What is a same-day courier service?", a: "A same-day courier collects your item and delivers it directly on the same day — no hubs, no sorting depots. We can often collect within 60 minutes of booking." },
    { q: "What can you deliver?", a: "Anything from documents and parcels up to furniture, appliances and heavy or awkward items that normal parcel firms won't take. If it fits in the van, we can move it." },
    { q: "How quickly can you collect?", a: "Often within an hour or two locally, depending on availability. Booking earlier in the day gives the most flexibility." },
    { q: "Do you deliver long distance?", a: "Yes. We run deliveries across the whole UK and into Europe, not just near you — direct, with tracking the whole way." },
    { q: "Are items insured in transit?", a: "Yes. Every job is covered by goods-in-transit insurance, so your item is protected from collection to delivery." },
    { q: "Do you offer scheduled contract runs for businesses?", a: "Yes. We set up daily or weekly routes and multi-drop runs for businesses at fixed, discounted rates — just tell us your schedule." },
  ],
  form: { pill: "★ Courier Service", title: "Get a Courier Quote", subtitle: "Same-day, next-day, multi-drop and international." },
};

export default function Page() {
  return <ServicePage data={data} />;
}
