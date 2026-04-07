import PracticeAreaPageComponent from "@/components/PracticeAreaPage";
// Hidden until data is ready:
// import ClientsTicker from "@/components/ClientsTicker";
// import AffiliationsTicker from "@/components/AffiliationsTicker";
import { practiceGroupsService } from "@/services";
import { generatePageMetadata } from "@/lib/metadata";
import { Locale } from "@/lib/dictionary";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 3600; // one hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    page: "practiceAreas",
    path: "/practice-areas",
  });
}

export default async function PracticeAreasPage({ params }: PageProps) {
  const { locale } = await params;

  const groupsResponse = await practiceGroupsService.getAllWithAreas();

  if (groupsResponse.error) {
    console.error("Error fetching practice groups:", groupsResponse.error);
  }

  // Filter for active groups and active areas
  const practiceGroups = (groupsResponse.data || [])
    .filter((group) => group.status === "Active")
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .map((group) => ({
      ...group,
      practice_areas: (group.practice_areas || [])
        .filter((area: any) => area.status === "Active")
        .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0)),
    }));

  return (
    <PracticeAreaPageComponent
      targetId={null}
      practiceGroups={practiceGroups}
      locale={locale}
      /* Tickers hidden until data is ready:
      clientsTickerSection={<ClientsTicker theme="light" />}
      affiliationsTickerSection={<AffiliationsTicker />}
      */
    />
  );
}
