import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Achievements from "@/components/Achievements";
import Articles from "@/components/Articles";
import CTASection from "@/components/CTASection";
import { ARTICLE_DATA } from "@/data/articles";

export default function HomePage() {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      <div id="expertise">
        <Services />
      </div>
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
