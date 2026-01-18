import type { Metadata } from "next";
import { Inter, Space_Grotesk, Merriweather } from "next/font/google";
// import localFont from "next/font/local";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { getDictionary, locales } from "@/lib/dictionary";
import { TranslationProvider } from "@/components/TranslationProvider";

// const geometricaSans = localFont({
//   src: "../../fonts/GeometricaSans-Regular.woff",
//   variable: "--font-primary",
//   display: "swap",
// });
//
const fontPrimary = Space_Grotesk({
  display: "swap",
  variable: "--font-primary",
});

// const museo = localFont({
//   src: "../../fonts/Museo300-Regular.woff",
//   variable: "--font-secondary",
//   display: "swap",
// });

const fontSecondary = Merriweather({
  display: "swap",
  variable: "--font-secondary",
});

const inter = Inter({
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IBLM Law Group | Protection for the Digital Arena",
  description:
    "IBLM Law Group - Specialized legal counsel for the gaming and esports industry.",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  // Cast locale to valid type since we checked includes()
  const messages = await getDictionary(locale as any);

  return (
    <html lang={locale}>
      <body
        className={`${fontPrimary.variable} ${fontSecondary.variable} ${inter.variable} antialiased min-h-screen bg-white text-[#0B1B3B] selection:bg-[#D4C5A0] selection:text-[#0B1B3B]`}
      >
        <TranslationProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
