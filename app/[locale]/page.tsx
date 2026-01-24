import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Achievements from "@/components/Achievements";
import Articles from "@/components/Articles";
import CTASection from "@/components/CTASection";
import LogoTicker from "@/components/LogoTicker";
import PracticeAreasSection from "@/components/PracticeAreasSection";
import { ARTICLE_DATA } from "@/data/articles";
import { CLIENT_LOGOS, ORG_LOGOS } from "@/data/logos";
import { lawyersService, practiceGroupsService } from "@/services";
import { getDictionary, Locale } from "@/lib/dictionary";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch data in parallel
  const [lawyersResponse, practiceGroupsResponse, dict] = await Promise.all([
    lawyersService.getActiveWithPositionAndPracticeAreas(),
    practiceGroupsService.getActive(),
    getDictionary(locale as Locale),
  ]);
  const lawyers = lawyersResponse.data || [];
  const practiceGroups = practiceGroupsResponse.data || [];

  // Build team translations from dictionary
  const teamTranslations = {
    title: dict.home.team.title,
    subtitle: dict.home.team.subtitle,
    cta: dict.home.team.cta,
    noTeam: dict.home.team.noTeam,
    detail: dict.lawyers.detail,
  };

  return (
    <>
      <div id="hero" className="-mt-[122px]">
        <Hero />
      </div>
      {/* Client Logo Ticker */}
      <LogoTicker
        title="Trusted By Industry Leaders"
        items={CLIENT_LOGOS}
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
        items={ORG_LOGOS}
        theme="light"
      />
      <div id="achievements">
        <Achievements />
      </div>
      <div id="team">
        <Team lawyers={lawyers} locale={locale} translations={teamTranslations} />
      </div>
      <div id="articles">
        <Articles articles={ARTICLE_DATA} />
      </div>
      <CTASection />
    </>
  );
}
