import EventDetailPage from "@/components/EventDetailPage";
import { eventsService } from "@/services/events.service";
import { Event as FrontendEvent } from "@/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { data: events } = await eventsService.getAll();
  
  if (!events) return [];

  return events.map((event) => ({
    id: event.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
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
      (isId ? dbEvent.location_id : dbEvent.location_en) || dbEvent.location_en,
    externalLink: dbEvent.registration_url || undefined,
  };

  return <EventDetailPage event={event} />;
}
