import { DM_Serif_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";

// Display: DM Serif Display — a bold, high-impact luxury serif for striking headlines.
const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
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
        {children}
      </body>
    </html>
  );
}
