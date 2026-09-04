import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FITFORGE — Your Body Is A System",
  description:
    "FITFORGE turns your body, training, nutrition and progress into one intelligent system. One body. One system. Built around you.",
  keywords: ["fitness", "training", "nutrition", "system", "FITFORGE"],
  openGraph: {
    title: "FITFORGE — Your Body Is A System",
    description:
      "FITFORGE turns your body, training, nutrition and progress into one intelligent system.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-fg font-sans antialiased">{children}</body>
    </html>
  );
}
