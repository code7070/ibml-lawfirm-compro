import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Achievements from "@/components/Achievements";
import Articles from "@/components/Articles";
import CTASection from "@/components/CTASection";
import LogoTicker from "@/components/LogoTicker";
import PracticeAreasSection from "@/components/PracticeAreasSection";
import {
  practiceGroupsService,
  clientsService,
} from "@/services";
import { ARTICLE_DATA } from "@/data/articles";
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
    page: "home",
    path: "",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch data in parallel — lawyers are fetched inside Team component
  const [practiceGroupsResponse, clientsResponse, dict] =
    await Promise.all([
      practiceGroupsService.getActive(),
      clientsService.getAllSorted(),
      getDictionary(locale as Locale),
    ]);
  const practiceGroups = practiceGroupsResponse.data || [];
  const allClients = clientsResponse.data || [];

  // Filter and map clients data
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
    <>
      <div id="hero" className="-mt-[122px]">
        <Hero />
      </div>
      {/* Client Logo Ticker */}
      <LogoTicker
        title="Trusted By Industry Leaders"
        items={clientLogos}
        theme="dark"
      />
      <div id="expertise">
        <PracticeAreasSection
          practiceGroups={practiceGroups}
          locale={locale}
          label={dict.home.practice_section.label}
          title={
            <>
              {dict.home.practice_section.title_prefix}{" "}
              <span className="font-serif italic text-[#2E4472]">
                {dict.home.practice_section.title_suffix}
              </span>
            </>
          }
          description={dict.home.practice_section.description}
        />
      </div>
      {/* Org Logo Ticker */}
      <LogoTicker
        title="Industry Affiliations"
        items={orgLogos}
        theme="light"
      />
      <div id="achievements">
        <Achievements />
      </div>
      <div id="team">
        <Team locale={locale} />
      </div>
      <div id="articles">
        <Articles articles={ARTICLE_DATA} />
      </div>
      <CTASection />
    </>
  );
}
