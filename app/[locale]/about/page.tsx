import AboutPageComponent from "@/components/AboutPage";
import { CLIENT_LOGOS, ORG_LOGOS } from "@/data/logos";

export default function AboutPage() {
  return <AboutPageComponent clientLogos={CLIENT_LOGOS} orgLogos={ORG_LOGOS} />;
}
