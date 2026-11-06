import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Office Removals UK — Van Hero",
  description: "Professional office and commercial relocations with minimal disruption. Desks, IT, servers and archives moved evenings and weekends. Fixed-price, fully insured.",
};

const data = {
  label: "Office Removals",
  pill: "Office & Commercial Relocations",
  title: "Office Removal",
  intro: "Professional office relocations with minimal disruption. We move desks, IT equipment and archives during evenings and weekends, helping your business stay operational. Fully insured, fixed-price and professionally managed from start to finish.",
  heroImage: "/services/commercial.webp",
  heroBadge: "Evening & Weekend Moves",
  sectionHeading: "The Smart Choice for Commercial Relocations",
  sectionImage: "/moves/office.png",
  sectionParas: [
    "An office relocation is very different from a house move. Every hour of downtime costs money, IT equipment requires careful handling, and confidential documents must be transported securely. That's why Van Hero plans every commercial move around your business — not the other way around.",
    "From five-person offices to large corporate headquarters, we relocate workstations, server racks, archives and office furniture with minimal disruption. Every project is managed by a dedicated project manager, with full door-to-door insurance included.",
  ],
  features: [
    { icon: "⏱️", title: "Minimal Downtime", text: "We work evenings, weekends and overnight to minimise disruption, so your business is ready to trade again the next morning." },
    { icon: "🖥️", title: "IT Handled with Care", text: "Computers, servers, phones and cabling are carefully disconnected, transported and reconnected — so you don't have to handle the technical setup yourself." },
    { icon: "🔒", title: "Confidential & GDPR-Aware", text: "Sensitive documents and archives are transported securely, with confidential disposal available for unwanted paperwork and records." },
    { icon: "🪑", title: "Furniture Disassembly", text: "Professional dismantling and reassembly of desks, modular storage, boardroom tables and office furniture." },
    { icon: "👤", title: "One Point of Contact", text: "A dedicated project manager will oversee your relocation from the initial survey through to the final setup—giving you one point of contact throughout." },
    { icon: "🛡️", title: "Fully Insured", text: "Every commercial relocation includes comprehensive goods-in-transit and public liability insurance." },
  ],
  pricingCols: ["Office Size", "Start From", "Includes"],
  pricingIntro: "Transparent, fixed commercial pricing confirmed after a free survey — based on your headcount, the volume of furniture and IT, and access at both sites.",
  pricing: [
    ["Small Office", "£350+", "Up to 10 employees · 2-person team · goods-in-transit protection · packing materials included"],
    ["Large Workspace", "£900+", "Up to 30 employees · 4-person team · full IT disconnect & reconnect · dedicated coordinator · crates"],
    ["Corporate HQ", "Custom", "Complete building relocation"],
  ],
  steps: [
    { n: "01", title: "Free Survey", text: "We begin with a free on-site or virtual survey to assess your office, understand your requirements, and provide a clear, fixed-price quotation based on the size and complexity of your relocation." },
    { n: "02", title: "Pack & Prepare", text: "Our team carefully packs, labels, and protects your furniture, IT equipment, and confidential documents. Everything is organised by department or workstation to ensure a smooth, efficient setup." },
    { n: "03", title: "Relocate & Reinstall", text: "We complete your office move with minimal disruption, transporting everything safely before reassembling furniture, reconnecting equipment, and setting up your workspace." },
  ],
  faqHeading: "Questions About Office Removals",
  faqIntro: "Everything you need to know about relocating your business with Van Hero. Still got a question? Just call or message us.",
  faqs: [
    { q: "Do you handle IT, servers and computers?", a: "Yes. We safely disconnect, crate, transport and reconnect computers, servers, phones and cabling, so your team can get back online quickly." },
    { q: "Are commercial moves insured?", a: "Yes. Every office relocation is covered by goods-in-transit and public liability insurance, so your equipment and assets are protected throughout." },
    { q: "How far in advance should we book an office move?", a: "The earlier the better for larger relocations — ideally a few weeks out — but we can turn around smaller and urgent office moves quickly. Get in touch and we'll plan around your timeline." },
    { q: "Can you move us out of hours or at weekends?", a: "Yes — that's how most of our commercial moves run. We work evenings and weekends so your business loses as little trading time as possible." },
    { q: "How much does an office move cost?", a: "After a free survey we give you a fixed, all-in quote based on your headcount, the volume of furniture and IT, and access at both sites. No hourly guesswork." },
    { q: "Can you clear old office furniture and IT after the move?", a: "Yes. We can remove and responsibly recycle old desks, chairs and electrical equipment as part of the move, and provide the paperwork for your records." },
  ],
  form: { pill: "★ Office Removals", title: "Book a Free Office Survey", subtitle: "Fixed-price commercial relocations, out of hours." },
  quoteWizard: true,   // show the full price calculator on this page
};

export default function Page() {
  return <ServicePage data={data} />;
}
