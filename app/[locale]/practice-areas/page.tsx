import PracticeAreaPageComponent from "@/components/PracticeAreaPage";
import { CLIENT_LOGOS, ORG_LOGOS } from "@/data/logos";

export default function PracticeAreasPage() {
  return (
    <PracticeAreaPageComponent
      clientLogos={CLIENT_LOGOS}
      orgLogos={ORG_LOGOS}
    />
  );
}
