import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";
import FloatingContact from "@/components/FloatingContact";

// Display: Bricolage Grotesque — the exact bold grotesque headline used on
// vanhero.online. Variable font: omit `weight` (avoids Vercel next/font build error).
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body / UI: Inter — the live site's body typeface. Variable: omit `weight`.
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Van Hero — UK Removals & Logistics",
  description:
    "Van Hero is Moving Britain Right Now. House removals, man & van, storage and couriers across the UK. Fixed or hourly pricing, fully insured & licensed.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <Loader />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
