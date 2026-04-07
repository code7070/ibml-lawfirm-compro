import EventDetailPage from "@/components/EventDetailPage";
import { eventsService } from "@/services/events.service";
import { Event as FrontendEvent } from "@/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 3600; // one hour

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://iblmlaw.com";
const META_IMAGE_PATH = "/images/meta-image-iblm.jpg";

export async function generateStaticParams() {
  const { data: events } = await eventsService.getAll();

  if (!events) return [];

  return events.map((event) => ({
    id: event.id,
  }));
}

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const isId = locale === "id";
  const { data: dbEvent } = await eventsService.getById(id);

  if (!dbEvent) return { title: "Event Not Found" };

  const title =
    (isId ? dbEvent.title_id : dbEvent.title_en) || dbEvent.title_en;
  const desc =
    (isId ? dbEvent.description_id : dbEvent.description_en) ||
    dbEvent.description_en ||
    "";
  const url = `${BASE_URL}/${locale}/events/${id}`;
  const imageUrl = dbEvent.image_url || `${BASE_URL}${META_IMAGE_PATH}`;

  return {
    title: `${title} | IBLM Law Group`,
    description: desc.substring(0, 160),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: {
        en: `/en/events/${id}`,
        id: `/id/events/${id}`,
      },
    },
    openGraph: {
      type: "website",
      locale: isId ? "id_ID" : "en_US",
      url,
      title: `${title} | IBLM Law Group`,
      description: desc.substring(0, 160),
      siteName: "IBLM Law Group",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | IBLM Law Group`,
      description: desc.substring(0, 160),
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id, locale } = await params;
  const { data: dbEvent, error } = await eventsService.getById(id);

  if (error || !dbEvent) {
    notFound();
  }

  const date = new Date(dbEvent.event_date);
  const isId = locale === "id";

  const event: FrontendEvent = {
    id: dbEvent.id,
    title: (isId ? dbEvent.title_id : dbEvent.title_en) || dbEvent.title_en,
    date: date.toLocaleDateString(isId ? "id-ID" : "en-US", {
      month: "long",
      day: "numeric",
    }),
    time: date.toLocaleTimeString(isId ? "id-ID" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    year: date.getFullYear().toString(),
    image: dbEvent.image_url || "/images/event-placeholder.jpg",
    description:
      (isId ? dbEvent.description_id : dbEvent.description_en) ||
      dbEvent.description_en ||
      "",
    location:
      (isId ? dbEvent.location_id : dbEvent.location_en) ||
      dbEvent.location_en ||
      undefined,
    externalLink: dbEvent.registration_url || undefined,
  };

  return <EventDetailPage event={event} />;
}
