import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kensa - Your Research, Elevated",
  description: "AI-powered platform that helps researchers organize papers, discover grants, and accelerate breakthroughs. Launching January 2025.",
  keywords: ["research", "AI", "academic", "papers", "grants", "literature review"],
  authors: [{ name: "Kensa" }],
  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    title: "Kensa - Your Research, Elevated",
    description: "AI-powered platform that helps researchers organize papers, discover grants, and accelerate breakthroughs.",
    url: "https://kensa.to",
    siteName: "Kensa",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Kensa - Your Research, Elevated',
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kensa - Your Research, Elevated",
    description: "AI-powered platform that helps researchers organize papers, discover grants, and accelerate breakthroughs.",
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}