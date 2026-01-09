import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geometricaSans = localFont({
  src: "../fonts/GeometricaSans-Regular.woff",
  variable: "--font-geometrica-sans",
  display: "swap",
});

const museo = localFont({
  src: "../fonts/Museo300-Regular.woff",
  variable: "--font-museo",
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Legal | Protection for the Digital Arena",
  description:
    "Nexus Legal Group - Specialized legal counsel for the gaming and esports industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geometricaSans.variable} ${museo.variable} ${roboto.variable} antialiased min-h-screen bg-white text-[#0B1B3B] selection:bg-[#D4C5A0] selection:text-[#0B1B3B]`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
