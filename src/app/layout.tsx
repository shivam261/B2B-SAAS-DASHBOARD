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
  title: "B2B Healthcare",
  description: "AI SAAS for B2B Healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* h-full ensures the html tag spans the entire height */
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    > 
      {/* 
          1. min-h-screen: Ensures body is at least 100% of viewport height.
          2. w-full: Ensures it spans the full width.
          3. overflow-x-hidden: Prevents accidental horizontal scrolling.
      */}
      <body className="min-h-screen w-full flex flex-col overflow-x-hidden bg-slate-50">
        {children}
      </body>
    </html>
  );
}
