import LawyersPage from "@/components/LawyersPage";
import { lawyersService, lawyerPositionsService } from "@/services";

export default async function Lawyers({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Fetch lawyers with positions and practice areas, and all active positions
  const [lawyersResponse, positionsResponse] = await Promise.all([
    lawyersService.getActiveWithPositionAndPracticeAreas(),
    lawyerPositionsService.getActive(),
  ]);

  return (
    <LawyersPage
      initialLawyers={lawyersResponse.data || []}
      positions={positionsResponse.data || []}
      locale={locale}
    />
  );
}
