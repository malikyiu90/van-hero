import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Professional Packing Services — Van Hero",
  description: "Let our experienced team pack your home with quality materials — double-walled boxes, bubble wrap and specialist wrapping. Fully insured, from £150.",
};

const data = {
  label: "Packing Services",
  pill: "Professional Packing Service",
  title: "Professional Packing Services",
  intro: "Let our experienced team take care of the packing. We use quality packing materials and handle every item with care, so you can move with less stress and complete peace of mind.",
  heroImage: "/services/packing-labelled.webp",
  heroBadge: "Same Day Available",
  sectionHeading: "Leave the Packing to the Professionals",
  sectionImage: "/services/kitchen-move.webp",
  sectionParas: [
    "Packing an entire home takes time, patience and the right materials. Let Van Hero take care of it for you. Our experienced packing team carefully wraps, protects and labels every item, so everything arrives organised, secure and ready to unpack.",
    "We use professional packing materials, including double-walled boxes, heavy-duty tape, protective blankets and specialist wrapping for fragile items. Every item is packed with the same care we'd use for our own belongings.",
  ],
  features: [
    { icon: "📦", title: "All Materials Included", text: "Premium boxes, tape, bubble wrap and packing paper all included." },
    { icon: "🏷️", title: "Room-by-Room Packing", text: "Every box is labelled clearly, making unpacking simple." },
    { icon: "🥂", title: "Fragile Item Specialists", text: "Expert packing for glassware, artwork, TVs and other delicate items." },
    { icon: "⚡", title: "Same-Day Available", text: "Need packing urgently? We can often help the very same day." },
    { icon: "📂", title: "Unpacking Service", text: "We can unpack, organise and remove all packaging once you've moved in." },
    { icon: "🛡️", title: "Insured & Trained", text: "Fully insured, experienced packers who treat your belongings with care." },
  ],
  pricingCols: ["Package", "Start From", "Includes"],
  pricingIntro: "Clear, fixed packing packages with all materials included — no hidden costs. Choose packing only, or add unpacking for a completely hands-off move.",
  pricing: [
    ["Essential Packing", "£150+", "Premium materials · ideal for kitchens & fragile items · clearly labelled · professional team"],
    ["Full Home Packing", "£900+", "Full 3-bed house packing · furniture disassembly · specialist artwork wrapping · wardrobe boxes"],
    ["Pack + Unpack Complete", "£450", "Full packing & labelling · complete unpacking service · packing material removal · priority move support"],
  ],
  steps: [
    { n: "01", title: "Get a Quote", text: "Tell us what needs packing and we'll provide a clear, no-obligation quote before any work begins." },
    { n: "02", title: "We Pack", text: "Our experienced packing team arrives with everything needed to carefully pack and clearly label every room." },
    { n: "03", title: "Ready to Move", text: "Everything is packed, protected and ready for moving day. Need help unpacking? We've got that covered too." },
  ],
  faqHeading: "Questions About Our Packing Service",
  faqIntro: "Everything you need to know about professional packing with Van Hero. Still got a question? Just call or message us.",
  faqs: [
    { q: "Do you provide all packing materials?", a: "Yes — boxes, tape, bubble wrap, paper and specialist wrapping are all included in the price. You don't need to buy a thing." },
    { q: "Can you pack my entire home?", a: "Absolutely. We pack everything from a few fragile items to a full multi-bedroom house, room by room, with clear labelling so unpacking is simple." },
    { q: "How far in advance should I book packing?", a: "For a full-home pack, a few days' notice is ideal — but we also offer same-day packing when you're up against a deadline. Just ask." },
    { q: "Are my items insured when you pack them?", a: "Yes. Our crews are fully insured, and professionally-packed boxes are covered in transit — which is often not the case for boxes you pack yourself." },
    { q: "Do you unpack as well as pack?", a: "Yes. Our pack-and-unpack option includes unpacking at your new home and clearing away all the empty boxes and materials." },
    { q: "Can I book packing without booking the move?", a: "Yes. You can book packing on its own, or bundle it with your Van Hero move for a smoother — and usually cheaper — day." },
  ],
  form: { pill: "★ Packing Service", title: "Pro Packers from £150", subtitle: "Materials, fragile specialists, same-day available." },
};

export default function Page() {
  return <ServicePage data={data} />;
}
