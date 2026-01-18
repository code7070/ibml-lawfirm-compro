import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Achievements from "@/components/Achievements";
import Articles from "@/components/Articles";
import CTASection from "@/components/CTASection";
import LogoTicker from "@/components/LogoTicker";
import { ARTICLE_DATA } from "@/data/articles";
import { CLIENT_LOGOS, ORG_LOGOS } from "@/data/logos";

export default function HomePage() {
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
        <Services />
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
        <Team />
      </div>
      <div id="articles">
        <Articles articles={ARTICLE_DATA} />
      </div>
      <CTASection />
    </>
  );
}
