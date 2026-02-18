import AboutPageComponent from "@/components/AboutPage";
import Team from "@/components/Team";
import { practiceGroupsService, clientsService } from "@/services";
import { getDictionary, Locale } from "@/lib/dictionary";
import { LogoItem } from "@/types";
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
  const [practiceGroupsResponse, clientsResponse, dict] = await Promise.all([
    practiceGroupsService.getActive(),
    clientsService.getAllSorted(),
    getDictionary(locale as Locale),
  ]);
  const practiceGroups = practiceGroupsResponse.data || [];
  const allClients = clientsResponse.data || [];

  // Filter and map clients data (same as Homepage)
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

  const practiceSectionTranslations = {
    label: dict.about.practice_section.label,
    title_prefix: dict.about.practice_section.title_prefix,
    title_suffix: dict.about.practice_section.title_suffix,
  };

  return (
    <AboutPageComponent
      clientLogos={clientLogos}
      orgLogos={orgLogos}
      locale={locale}
      practiceGroups={practiceGroups}
      practiceSectionTranslations={practiceSectionTranslations}
      teamSection={<Team locale={locale} />}
    />
  );
}
