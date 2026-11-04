import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";

// Display: Fraunces — a refined optical serif for a premium, editorial headline.
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Body / UI: Hanken Grotesk — a clean, simple grotesk (not the usual AI default).
const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
        {children}
      </body>
    </html>
  );
}
