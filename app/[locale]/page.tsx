import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Achievements from "@/components/Achievements";
import Articles from "@/components/Articles";
import CTASection from "@/components/CTASection";
// Hidden until data is ready:
// import ClientsTicker from "@/components/ClientsTicker";
// import AffiliationsTicker from "@/components/AffiliationsTicker";
import PracticeAreasSection from "@/components/PracticeAreasSection";
import { practiceGroupsService, articlesService } from "@/services";
import { getDictionary, Locale } from "@/lib/dictionary";
import { generatePageMetadata } from "@/lib/metadata";

export const revalidate = 3600; // one hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
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
  const [practiceGroupsResponse, articlesResponse, dict] = await Promise.all([
    practiceGroupsService.getActive(),
    articlesService.getFeatured(3),
    getDictionary(locale as Locale),
  ]);
  const practiceGroups = practiceGroupsResponse.data || [];
  const featuredArticles = articlesResponse.data || [];

  return (
    <>
      <div id="hero" className="-mt-[100px] md:-mt-[122px]">
        <Hero />
      </div>
      {/* Client Logo Ticker — hidden until data is ready */}
      {/* <ClientsTicker /> */}
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
      {/* Affiliations Ticker — hidden until data is ready */}
      {/* <AffiliationsTicker /> */}
      <div id="achievements">
        <Achievements />
      </div>
      <div id="team">
        <Team locale={locale} />
      </div>
      <div id="articles">
        <Articles articles={featuredArticles} locale={locale} />
      </div>
      <CTASection />
    </>
  );
}
