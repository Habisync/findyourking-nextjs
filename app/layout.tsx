import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "FindYourKing - Royal Dating for Kings",
  description: "Premium LGBTQ+ dating combining the best of MachoBB and ROMEO. Find your king with geolocation radar, chat, groups, and more.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${urbanist.variable}`}>
      <body className="min-h-screen pb-16">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
