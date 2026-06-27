import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk, Inter } from "next/font/google";
import { PortfolioProvider } from "@/lib/contexts/PortfolioContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nexus // DEV | John Daryl Homecillo",
  description:
    "Software Engineer and Prototype Developer based in Palawan, Philippines. Building internal systems, mobile applications, and award-winning IoT prototypes.",
  keywords: ["software engineer", "flutter", "mobile developer", "IoT", "Palawan", "Philippines"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} font-body antialiased`}
      >
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
