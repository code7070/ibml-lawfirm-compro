import ServicesPage from "@/components/ServicesPage";
import { ARTICLE_DATA } from "@/data/articles";
import { generatePageMetadata } from "@/lib/metadata";
import { Locale } from "@/lib/dictionary";

export const revaldiate = 60 * 5; // 60 seconds * 5 minutes = 5 minutes

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    page: "services",
    path: "/services",
  });
}

export default async function Services({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return <ServicesPage articles={ARTICLE_DATA} />;
}
