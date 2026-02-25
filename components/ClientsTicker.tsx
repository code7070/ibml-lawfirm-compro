// import { clientsService } from "@/services";
// import LogoTicker from "./LogoTicker";
// import { LogoItem } from "@/types";

interface ClientsTickerProps {
  title?: string;
  theme?: "dark" | "light";
}

/**
 * Self-contained Server Component that fetches client logos from the database
 * and renders a LogoTicker. Drop this into any page without needing to
 * fetch/filter/pass client data manually.
 *
 * Currently hidden — uncomment imports and body when data is ready.
 */
const ClientsTicker = async ({
  title = "Trusted By Industry Leaders",
  theme = "dark",
}: ClientsTickerProps) => {
  // const { data: allClients } = await clientsService.getAllSorted();
  //
  // const clientLogos: LogoItem[] = (allClients || [])
  //   .filter((c) => (c.type === "Client" || !c.type) && c.status === "Active")
  //   .map((c) => ({
  //     id: c.id,
  //     name: c.name,
  //     image: c.logo_url || undefined,
  //   }));
  //
  // if (clientLogos.length === 0) return null;
  //
  // return <LogoTicker title={title} items={clientLogos} theme={theme} />;
  return null;
};

export default ClientsTicker;
