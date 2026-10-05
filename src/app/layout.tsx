import type { Metadata, Viewport } from "next";
import { Inter, Manrope, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adham Baskara : Fullstack Developer & UI/UX Designer",
  description:
    "Portfolio of Adham Baskara: 7th-semester Informatics Engineering student at Polinema and Fullstack Developer Intern at PT. Multi Spunindo Jaya Tbk.",
  keywords: [
    "Adham Baskara",
    "fullstack developer",
    "UI/UX designer",
    "Politeknik Negeri Malang",
    "Polinema",
    "PT Multi Spunindo Jaya",
    "Next.js",
    "Laravel",
    "React",
    "portfolio",
  ],
  authors: [{ name: "Adham Baskara" }],
  openGraph: {
    title: "Adham Baskara : Fullstack Developer & UI/UX Designer",
    description:
      "Portfolio of Adham Baskara: 7th-semester Informatics Engineering student at Polinema and Fullstack Developer Intern at PT. Multi Spunindo Jaya Tbk.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
