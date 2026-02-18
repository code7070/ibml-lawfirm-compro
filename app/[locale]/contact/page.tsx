import ContactPageComponent from "@/components/ContactPage";
import { generatePageMetadata } from "@/lib/metadata";
import { Locale } from "@/lib/dictionary";

export const revalidate = 300;

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    page: "contact",
    path: "/contact",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <ContactPageComponent />;
}
