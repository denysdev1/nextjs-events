import { getAllEvents } from "../../helpers/api";
import AllEventsPage from "./events-page";

export const metadata = {
  title: "All Events",
  description: "Find a lot of great events that allow you to evolve...",
};

const getStaticProps = async () => {
  const events = await getAllEvents({
    next: { revalidate: 60 },
  });

  return events;
};

const Events = async () => {
  const events = await getStaticProps();

  return <AllEventsPage events={events} />;
};

export default Events;
