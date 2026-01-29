import ServicesPage from "@/components/ServicesPage";
import { ARTICLE_DATA } from "@/data/articles";

export const revaldiate = 60 * 5; // 60 seconds * 5 minutes = 5 minutes

export default function Services() {
  return <ServicesPage articles={ARTICLE_DATA} />;
}
