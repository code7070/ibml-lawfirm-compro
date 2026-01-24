import PracticeAreaPageComponent from "@/components/PracticeAreaPage";
import { CLIENT_LOGOS, ORG_LOGOS } from "@/data/logos";
import { practiceGroupsService } from "@/services";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PracticeAreasPage({ params }: PageProps) {
  const { locale } = await params;
  
  // Fetch practice groups with areas
  const { data: allGroups, error } = await practiceGroupsService.getAllWithAreas();
  
  if (error) {
    console.error("Error fetching practice groups:", error);
    // You might want to throw an error or show an error state
  }

  // Filter for active groups and active areas
  const practiceGroups = (allGroups || [])
    .filter(group => group.status === 'Active')
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .map(group => ({
      ...group,
      practice_areas: (group.practice_areas || [])
        .filter((area: any) => area.status === 'Active')
        .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
    }));

  return (
    <PracticeAreaPageComponent
      targetId={null}
      clientLogos={CLIENT_LOGOS}
      orgLogos={ORG_LOGOS}
      practiceGroups={practiceGroups}
      locale={locale}
    />
  );
}
