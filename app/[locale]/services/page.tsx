import { permanentRedirect } from "next/navigation";

// NOTE: Halaman /services saat ini diredirect ke /practice-areas.
// Komponen ServicesPage.tsx tetap disimpan di next/components/ untuk kemungkinan penggunaan di masa depan.
export default async function Services({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/practice-areas`);
}
