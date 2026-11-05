import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "House Removals in Coventry — Van Hero",
  description: "Reliable house removals and same-day local moves from £25 with no hidden fees. Fully insured crews, transparent pricing, 150+ five-star reviews.",
};

const data = {
  label: "Local Moving",
  pill: "40+ Active HEROS",
  title: "House Removals in Coventry",
  intro: "Reliable house removals and same-day local moves starts from £25 with No hidden fees. One of Coventry's trusted removal companies — fully insured crews, transparent pricing, and 150+ five-star reviews from local families.",
  heroImage: "/services/removals.png",
  heroBadge: "Same Day Available",
  sectionHeading: "Moving Home Made Simple",
  sectionImage: "/services/manvan.webp",
  sectionParas: [
    "Moving house is one of life's biggest milestones, and at Van Hero we make sure it's a smooth one. As a Coventry-based removals team, we handle everything from studio flats to large family homes with the same care and precision — so nothing arrives broken and nothing gets left behind.",
    "You get fully-equipped Luton vans, professional packing materials, and a crew that knows every corner of Warwickshire. Whether you're moving across Earlsdon or relocating to a new city, we've got you covered — and unlike many removal companies in Coventry, we give you a clear, fixed quote before we start.",
  ],
  features: [
    { icon: "💪", title: "Full Loading & Unloading", text: "Our crew does all the heavy lifting, start to finish. You don't carry a thing." },
    { icon: "🛡️", title: "Furniture Protection", text: "Heavy-duty blankets and straps secure every item in the van." },
    { icon: "🧻", title: "Floor Protection", text: "Protective runners keep your carpets and floors clean at both ends." },
    { icon: "🔧", title: "Disassembly & Reassembly", text: "We take apart beds and wardrobes, then rebuild them in your new home." },
    { icon: "📍", title: "GPS Tracking", text: "Real-time updates on your van's location throughout the day." },
    { icon: "✅", title: "Goods-in-Transit Insurance", text: "Included as standard, for genuine peace of mind." },
  ],
  pricingCols: ["Property Size", "Start From"],
  pricingIntro: "Honest, upfront pricing — no hidden fees, just clear rates for the crew and van size you need. The rate covers the van, fuel and the crew doing the lifting.",
  pricing: [
    ["1 Bedroom / Flat", "£50"],
    ["2 Bedroom House", "£100"],
    ["3 Bedroom House", "£145"],
    ["4+ Bedroom House", "£175"],
  ],
  steps: [
    { n: "01", title: "Get a Quote", text: "WhatsApp us a quick snap or fill in the form. Tell us what you're moving and where it's going." },
    { n: "02", title: "We Arrive", text: "Our crew turns up on time with everything needed for the move." },
    { n: "03", title: "Relax & Move", text: "Sit back while we handle the heavy lifting and transport." },
  ],
  faqHeading: "Questions About House Removals",
  faqIntro: "Everything you need to know about moving home with Van Hero. Still got a question? Just call or message us.",
  faqs: [
    { q: "Are you fully insured for house removals?", a: "Yes. Every move includes goods-in-transit and public liability insurance as standard, so your belongings are protected from the moment we load to the moment we unload." },
    { q: "Do you provide packing materials?", a: "Yes — we can supply boxes, tape, bubble wrap and blankets, and our team can pack the whole house for you or just the fragile items. Let us know when you book." },
    { q: "How far in advance should I book?", a: "The sooner the better for weekend and end-of-month dates, which book up fast. But we also keep slots for same-day and short-notice moves — call us and we'll find you a time." },
    { q: "How much does a house removal cost in Coventry?", a: "Removals start from £25 for the smallest moves, with the final price based on your property size, distance and how much you're moving. You'll get a clear fixed quote upfront — no hourly meter, no hidden fees." },
    { q: "Do you dismantle and reassemble furniture?", a: "Yes, as standard. We take apart beds, wardrobes and flat-pack furniture, move them safely, and rebuild them in your new home." },
    { q: "Do you move long distance, or just locally?", a: "Both. We cover Coventry and Warwickshire for local moves, and we also handle longer relocations right across the UK." },
  ],
  form: { pill: "★ Local Moving", title: "60-Second Local Move Quote", subtitle: "Fully insured crews — get a fixed price upfront." },
};

export default function Page() {
  return <ServicePage data={data} />;
}
