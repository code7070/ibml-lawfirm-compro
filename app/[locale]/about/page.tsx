import AboutPageComponent from "@/components/AboutPage";
import Team from "@/components/Team";
// Hidden until data is ready:
// import ClientsTicker from "@/components/ClientsTicker";
// import AffiliationsTicker from "@/components/AffiliationsTicker";
import { practiceGroupsService } from "@/services";
import { getDictionary, Locale } from "@/lib/dictionary";
import { generatePageMetadata } from "@/lib/metadata";

export const revalidate = 300;

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    page: "about",
    path: "/about",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch data in parallel — lawyers are fetched inside Team component
  const [practiceGroupsResponse, dict] = await Promise.all([
    practiceGroupsService.getActive(),
    getDictionary(locale as Locale),
  ]);
  const practiceGroups = practiceGroupsResponse.data || [];

  const practiceSectionTranslations = {
    label: dict.about.practice_section.label,
    title_prefix: dict.about.practice_section.title_prefix,
    title_suffix: dict.about.practice_section.title_suffix,
  };

  return (
    <AboutPageComponent
      locale={locale}
      practiceGroups={practiceGroups}
      practiceSectionTranslations={practiceSectionTranslations}
      teamSection={<Team locale={locale} />}
      /* Tickers hidden until data is ready:
      clientsTickerSection={<ClientsTicker />}
      affiliationsTickerSection={<AffiliationsTicker />}
      */
    />
  );
}
