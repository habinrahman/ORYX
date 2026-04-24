import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/system/app-shell";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "ORYX VILLAGE — Kerala’s largest destination dining",
    template: "%s — ORYX VILLAGE",
  },
  description:
    "Dining estate on the Kochi–Panvel Highway, Kanhangad: main rooms, Village Cafe, banquet halls, seafood salon, children’s salon — Kerala, Arabic, and grill — service nightly until 12:30 AM.",
  openGraph: {
    title: "ORYX VILLAGE — Kerala’s largest destination dining",
    description:
      "Kovalpalli, Kanhangad: seafood salon, Kizhi biriyani, tandoori and Arabic platters, pastry atelier, private dining, and banquets — one estate, late hours.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${newsreader.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-[color:var(--gold)]/25 selection:text-foreground">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
