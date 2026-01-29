import AboutPageComponent from "@/components/AboutPage";
import { CLIENT_LOGOS, ORG_LOGOS } from "@/data/logos";
import { lawyersService, practiceGroupsService } from "@/services";
import { getDictionary, Locale } from "@/lib/dictionary";
import { generatePageMetadata } from "@/lib/metadata";

export const revaldiate = 60 * 5; // 60 seconds * 5 minutes = 5 minutes

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

  // Fetch data in parallel
  const [lawyersResponse, practiceGroupsResponse, dict] = await Promise.all([
    lawyersService.getActiveWithPositionAndPracticeAreas(),
    practiceGroupsService.getActive(),
    getDictionary(locale as Locale),
  ]);
  const lawyers = lawyersResponse.data || [];
  const practiceGroups = practiceGroupsResponse.data || [];

  // Build team translations from dictionary
  const teamTranslations = {
    title: dict.home.team.title,
    subtitle: dict.home.team.subtitle,
    cta: dict.home.team.cta,
    noTeam: dict.home.team.noTeam,
    detail: dict.lawyers.detail,
  };

  const practiceSectionTranslations = {
    label: dict.about.practice_section.label,
    title_prefix: dict.about.practice_section.title_prefix,
    title_suffix: dict.about.practice_section.title_suffix,
  };

  return (
    <AboutPageComponent
      clientLogos={CLIENT_LOGOS}
      orgLogos={ORG_LOGOS}
      lawyers={lawyers}
      locale={locale}
      teamTranslations={teamTranslations}
      practiceGroups={practiceGroups}
      practiceSectionTranslations={practiceSectionTranslations}
    />
  );
}
