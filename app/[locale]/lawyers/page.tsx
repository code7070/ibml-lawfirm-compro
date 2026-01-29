import LawyersPage from "@/components/LawyersPage";
import { lawyersService, lawyerPositionsService } from "@/services";
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
    page: "lawyers",
    path: "/lawyers",
  });
}

export default async function Lawyers({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch lawyers, positions, and translations in parallel
  const [lawyersResponse, positionsResponse, dict] = await Promise.all([
    lawyersService.getActiveWithPositionAndPracticeAreas(),
    lawyerPositionsService.getActive(),
    getDictionary(locale as Locale),
  ]);

  // Build translations for LawyersPage
  const lawyersPageTranslations = {
    hero: dict.lawyers.hero,
    fallbackTeamTitle: dict.lawyers.hero.title,
    detail: dict.lawyers.detail,
  };

  return (
    <LawyersPage
      initialLawyers={lawyersResponse.data || []}
      positions={positionsResponse.data || []}
      locale={locale}
      translations={lawyersPageTranslations}
    />
  );
}
