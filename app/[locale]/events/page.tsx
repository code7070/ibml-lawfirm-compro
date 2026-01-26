import EventsPage from "@/components/EventsPage";
import { eventsService } from "@/services/events.service";
import { Event as FrontendEvent } from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { data: dbEvents } = await eventsService.getUpcoming();

  const events: FrontendEvent[] =
    dbEvents?.map((event) => {
      const date = new Date(event.event_date);
      const isId = locale === "id";

      return {
        id: event.id,
        title: (isId ? event.title_id : event.title_en) || event.title_en,
        date: date.toLocaleDateString(isId ? "id-ID" : "en-US", {
          month: "long",
          day: "numeric",
        }),
        time: date.toLocaleTimeString(isId ? "id-ID" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        year: date.getFullYear().toString(),
        image: event.image_url || "/images/event-placeholder.jpg",
        description:
          (isId ? event.description_id : event.description_en) ||
          event.description_en ||
          "",
        location:
          (isId ? event.location_id : event.location_en) || event.location_en,
        externalLink: event.registration_url || undefined,
      };
    }) || [];

  return <EventsPage events={events} />;
}
