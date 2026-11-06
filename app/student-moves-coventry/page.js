import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Student Moves Across UK — Van Hero",
  description: "End-of-term moves, hall changeovers and student flat relocations from £25. 20% student discount, bike transport, flexible timing — fully insured.",
};

const data = {
  label: "Student Moves",
  pill: "Student Moves · 20% Student Discount",
  title: "Student Moves Across UK",
  intro: "End-of-term moves, hall changeovers and student flat relocations from just £25.",
  heroImage: "/services/student.webp",
  heroBadge: "20% Student Discount",
  sectionHeading: "Stress-Free Student Moves Across the UK & Warwick",
  sectionImage: "/services/manvan.webp",
  sectionParas: [
    "Moving out of student accommodation should mark the start of your holiday—not the start of a logistical headache. Whether you're moving out of Priory Hall at the UK University or relocating to a shared house in Leamington Spa for Warwick University, Van Hero makes the process simple.",
    "We understand the challenges of student life: tight key-return deadlines, limited budgets, and the need to move everything from bikes and laptops to laundry bags safely. That's why we offer 20% off for all current students, making your move straightforward, affordable and stress-free.",
  ],
  features: [
    { icon: "🎓", title: "Hall Move-Out", text: "Fast, efficient collections from university halls, with parking and access handled by our team." },
    { icon: "🏘️", title: "Flat-to-Flat Moves", text: "Moving from a studio to a shared house? We'll handle the heavy lifting, stairs and transport." },
    { icon: "🛣️", title: "Coventry-to-Home", text: "Long-distance moves from the UK to anywhere in the UK—perfect for moving home or into storage." },
    { icon: "🚲", title: "Bicycle Transport", text: "Your bike is securely strapped and protected throughout the journey, helping it arrive in excellent condition." },
    { icon: "🗓️", title: "Flexible Timing", text: "We know plans change, so we offer flexible booking times during busy move-out periods." },
    { icon: "💸", title: "Student Discount", text: "Show a valid student ID to receive 20% off your move." },
  ],
  pricingCols: ["Service", "Start From", "Crew", "Best For"],
  pricingIntro: "Student-friendly, fixed pricing with 20% off for current students. Every move includes the van, fuel and an experienced crew — no hourly meter, no hidden fees.",
  pricing: [
    ["Boxes & Bags", "£25", "1 Man + Van", "Boxes, bags and suitcases"],
    ["Full Room", "£65", "2 Men + Van", "Boxes, bikes, mini fridges, TVs and more"],
    ["House Share", "£120", "2 Men + Van", "House shares, studio flats and one-bedroom moves"],
  ],
  steps: [
    { n: "01", title: "Get a Quote", text: "Send us a few photos of your items on WhatsApp, and we'll provide a fast, no-obligation quote." },
    { n: "02", title: "We Arrive", text: "Our experienced team arrives on time with everything needed to complete your move safely and efficiently." },
    { n: "03", title: "Relax & Move", text: "Sit back and relax while we take care of the lifting, loading and transport." },
  ],
  faqHeading: "Frequently Asked Questions About Student Moves",
  faqIntro: "Everything students ask us about moving. Still got a question? Just call or message us.",
  faqs: [
    { q: "How much does a student move cost in the UK?", a: "Student moves start from £25 for a halls run — boxes, bags and a suitcase — and from £65 for a full room with your bike and bits. You'll get a fixed price before we start, plus 20% off for being a student. No hidden fees, no hourly meter." },
    { q: "How do I get the 20% student discount?", a: "Just show your student ID on the day and we'll take 20% off your final bill. It applies to every student move, at any time of year — no codes, no small print." },
    { q: "Can you move me out of halls on my key-return day?", a: "Yes — that's one of our busiest jobs. We know how tight key-return deadlines are, so we'll book you a slot that fits your window and turn up on time. End of term gets busy fast, so book early if you can." },
    { q: "Can you transport my bike?", a: "Yes. Bikes come as standard on any student move — we strap and protect them properly so they arrive without a scratch. Just mention it when you book so we leave the right space." },
    { q: "Can you store my things over the summer?", a: "Yes. Lots of students store between tenancies rather than lugging everything home and back. We can move your stuff straight into secure storage and bring it back when term starts." },
    { q: "Can you move me home at the end of term?", a: "Yes — we do long-distance student moves anywhere in the UK. Wherever home is, we'll quote you a fixed price upfront and get your things there safely, with no surprise charges." },
  ],
  form: { pill: "★ Student Moves", title: "20% Off Student Moves", subtitle: "End-of-term, halls and flat-shares from £25." },
};

export default function Page() {
  return <ServicePage data={data} />;
}
