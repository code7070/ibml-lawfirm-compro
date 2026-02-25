import PrivacyPolicyPage from "@/components/PrivacyPolicyPage";
import { generatePageMetadata } from "@/lib/metadata";
import { Locale } from "@/lib/dictionary";
import { Metadata } from "next";

export const revalidate = 86400; // revalidate once a day

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    page: "privacyPolicy",
    path: "/privacy-policy",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PrivacyPolicyPage locale={locale} />;
}
