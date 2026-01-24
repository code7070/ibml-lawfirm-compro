import LawyersPage from "@/components/LawyersPage";
import { lawyersService, lawyerPositionsService } from "@/services";
import { getDictionary, Locale } from "@/lib/dictionary";

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
