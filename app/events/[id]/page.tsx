import EventDetailPage from "@/components/EventDetailPage";
import { EVENT_DATA } from "@/data/events";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return EVENT_DATA.map((event) => ({
    id: event.id,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = EVENT_DATA.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return <EventDetailPage event={event} />;
}
