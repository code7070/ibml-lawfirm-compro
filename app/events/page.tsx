import EventsPage from "@/components/EventsPage";
import { EVENT_DATA } from "@/data/events";

export default function Page() {
  return <EventsPage events={EVENT_DATA} />;
}
