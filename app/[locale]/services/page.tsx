import ServicesPage from "@/components/ServicesPage";
import { ARTICLE_DATA } from "@/data/articles";
import { clientsService } from "@/services";
import { generatePageMetadata } from "@/lib/metadata";
import { Locale } from "@/lib/dictionary";
import { LogoItem } from "@/types";

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
  // Fetch clients data
  const clientsResponse = await clientsService.getAllSorted();
  const allClients = clientsResponse.data || [];

  // Filter and map clients data (same pattern as /about and /practice-areas)
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

  return (
    <ServicesPage
      articles={ARTICLE_DATA}
      clientLogos={clientLogos}
      orgLogos={orgLogos}
    />
  );
}
