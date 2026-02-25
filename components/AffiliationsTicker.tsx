// import { clientsService } from "@/services";
// import LogoTicker from "./LogoTicker";
// import { LogoItem } from "@/types";

interface AffiliationsTickerProps {
  title?: string;
  theme?: "dark" | "light";
}

/**
 * Self-contained Server Component that fetches organization/affiliation logos
 * from the database and renders a LogoTicker. Drop this into any page without
 * needing to fetch/filter/pass org data manually.
 *
 * Currently hidden — uncomment imports and body when data is ready.
 */
const AffiliationsTicker = async ({
  title = "Industry Affiliations",
  theme = "light",
}: AffiliationsTickerProps) => {
  // const { data: allClients } = await clientsService.getAllSorted();
  //
  // const orgLogos: LogoItem[] = (allClients || [])
  //   .filter((c) => c.type === "Organization" && c.status === "Active")
  //   .map((c) => ({
  //     id: c.id,
  //     name: c.name,
  //     image: c.logo_url || undefined,
  //   }));
  //
  // if (orgLogos.length === 0) return null;
  //
  // return <LogoTicker title={title} items={orgLogos} theme={theme} />;
  return null;
};

export default AffiliationsTicker;
