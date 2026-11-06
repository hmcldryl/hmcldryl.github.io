import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Space_Grotesk, Inter } from "next/font/google";
import { RevealObserver } from "@/app/components/portfolio/RevealObserver";
import { PaperTexture } from "@/app/components/portfolio/PaperTexture";
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

const title = "John Daryl Homecillo";
const description =
  "Software Engineer and Prototype Developer based in Palawan, Philippines. Building internal systems, mobile applications, and award-winning IoT prototypes.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hmcldryl.github.io"),
  title,
  description,
  keywords: ["software engineer", "flutter", "mobile developer", "IoT", "Palawan", "Philippines"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    images: [{ url: "/assets/me.png", width: 500, height: 500, alt: title }],
  },
  twitter: { card: "summary", title, description, images: ["/assets/me.png"] },
};

export const viewport: Viewport = {
  themeColor: "#F2ECDD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Icon font: pinned to the one axis setting globals.css uses, so the
            whole variable font isn't downloaded. display=block hides the raw
            ligature names ("home", "work") while it loads. */}
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
          rel="stylesheet"
        />
        {/* Reveal starts hidden and needs JS to clear; don't blank the page without it. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1;transform:none}`}</style>
        </noscript>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} font-body antialiased bg-background text-on-surface`}
      >
        <RevealObserver />
        <PaperTexture />
        {children}
      </body>
    </html>
  );
}
