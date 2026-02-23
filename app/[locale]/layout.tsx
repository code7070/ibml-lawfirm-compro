import localFont from "next/font/local";
import { Inter, Space_Grotesk, Merriweather } from "next/font/google";
// import localFont from "next/font/local";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { getDictionary, locales, Locale } from "@/lib/dictionary";
import { TranslationProvider } from "@/components/TranslationProvider";
import { generatePageMetadata } from "@/lib/metadata";
import { GoogleAnalytics } from "@next/third-parties/google";

const geometricaSans = localFont({
  src: "../fonts/GeometricaSans-Regular.woff",
  variable: "--font-geometrica-var",
  display: "swap",
});

const museo = localFont({
  src: "../fonts/Museo300-Regular.woff",
  variable: "--font-museo-var",
  display: "swap",
});

const fontPrimary = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-primary-var",
});

const fontSecondary = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-secondary-var",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body-var",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const metadata = await generatePageMetadata({
    locale: locale as Locale,
    page: "default",
    path: "",
  });

  // Add metadataBase in root layout only
  return {
    ...metadata,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL ||
        "https://preview-iblm-compro.vercel.app",
    ),
  };
}

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
        className={`${geometricaSans.variable} ${museo.variable} ${fontPrimary.variable} ${fontSecondary.variable} ${inter.variable} antialiased min-h-screen bg-white text-[#0B1B3B] selection:bg-[#D4C5A0] selection:text-[#0B1B3B]`}
      >
        <TranslationProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer dictionary={messages} />
        </TranslationProvider>
        <GoogleAnalytics gaId={process.env.GA_ID!} />
      </body>
    </html>
  );
}
