import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./projects.css";

const sfUiDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/sf-ui-display/sf-ui-display-ultralight-58646b19bf205.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-ui-display/sf-ui-display-thin-58646e9b26e8b.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-ui-display/sf-ui-display-light-58646b33e0551.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-ui-display/sf-ui-display-light-58646b33e0551.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-ui-display/sf-ui-display-medium-58646be638f96.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-ui-display/sf-ui-display-semibold-58646eddcae92.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-ui-display/sf-ui-display-bold-58646a511e3d9.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-ui-display/sf-ui-display-heavy-586470160b9e5.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/sf-ui-display/sf-ui-display-black-58646a6b80d5a.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sf-ui",
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
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sfUiDisplay.variable}>
      <body>{children}</body>
    </html>
  );
}
