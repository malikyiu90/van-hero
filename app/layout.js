import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";
import ScrollVan from "@/components/ScrollVan";
import BackToTop from "@/components/BackToTop";

// Display: Fraunces — a refined optical serif for a premium, editorial headline.
// Variable font: omit `weight` so the full weight axis loads in one file (robust at build time).
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Body / UI: Hanken Grotesk — a clean, simple grotesk (not the usual AI default).
const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Van Hero — Coventry Removals & Logistics",
  description:
    "Van Hero is Moving Coventry Right Now. House removals, man & van, storage and couriers across Coventry & Warwickshire. Fixed or hourly pricing, fully insured & licensed.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <Loader />
        <ScrollVan />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
