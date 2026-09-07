import type { Metadata } from "next";
import { Ancizar_Serif, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const ancizar = Ancizar_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic"],
  display: "swap",
  variable: "--font-ancizar",
  // next/font ships no metric overrides for this family yet.
  adjustFontFallback: false,
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});

export const metadata: Metadata = {
  title: "Vodex — GenAI voice agents that turn outreach into revenue",
  description:
    "GenAI-powered voice agents for enterprise engagement. Make reminders, collections, follow-ups, qualification, payment negotiation and more easy without the extra overhead.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${ancizar.variable}`}>
      <body>{children}</body>
    </html>
  );
}
