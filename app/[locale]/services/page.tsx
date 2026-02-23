import ServicesPage from "@/components/ServicesPage";
import { clientsService, articlesService } from "@/services";
import { generatePageMetadata } from "@/lib/metadata";
import { Locale } from "@/lib/dictionary";
import { LogoItem } from "@/types";

export const revalidate = 300;

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
  const { locale } = await params;

  // Fetch clients and recent articles in parallel
  const [clientsResponse, articlesResponse] = await Promise.all([
    clientsService.getAllSorted(),
    articlesService.getFeatured(6),
  ]);
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

  const articles = articlesResponse.data || [];

  return (
    <ServicesPage
      articles={articles}
      locale={locale}
      clientLogos={clientLogos}
      orgLogos={orgLogos}
    />
  );
}
