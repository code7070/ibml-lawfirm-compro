import PracticeAreaPageComponent from "@/components/PracticeAreaPage";
import { practiceGroupsService, clientsService } from "@/services";
import { generatePageMetadata } from "@/lib/metadata";
import { Locale } from "@/lib/dictionary";
import { LogoItem } from "@/types";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 300;

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
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

  // Fetch practice groups and clients in parallel
  const [groupsResponse, clientsResponse] = await Promise.all([
    practiceGroupsService.getAllWithAreas(),
    clientsService.getAllSorted(),
  ]);

  if (groupsResponse.error) {
    console.error("Error fetching practice groups:", groupsResponse.error);
  }

  const allClients = clientsResponse.data || [];

  // Filter and map clients data (same pattern as /about)
  const clientLogos: LogoItem[] = allClients
    .filter((c) => (c.type === "Client" || !c.type) && c.status === "Active")
    .map((c) => ({
      id: c.id,
      name: c.name,
      image: c.logo_url || undefined,
    }));

  const orgLogos: LogoItem[] = allClients
    .filter((c) => c.type === "Organization" && c.status === "Active")
    .map((c) => ({
      id: c.id,
      name: c.name,
      image: c.logo_url || undefined,
    }));

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
      clientLogos={clientLogos}
      orgLogos={orgLogos}
      practiceGroups={practiceGroups}
      locale={locale}
    />
  );
}
