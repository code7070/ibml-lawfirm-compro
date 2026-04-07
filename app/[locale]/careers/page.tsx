import CareerPage from "@/components/CareerPage";
import { generatePageMetadata } from "@/lib/metadata";
import { Locale } from "@/lib/dictionary";
// import { jobsService } from "@/services";

export const revalidate = 3600; // one hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    page: "careers",
    path: "/careers",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // const jobsResponse = await jobsService.getOpen();
  // const jobs = jobsResponse.data || [];

  return <CareerPage jobs={[]} locale={locale} />;
}
