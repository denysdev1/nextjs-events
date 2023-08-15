import EventDetailsPage from "./event-details-page";
import { getEventById, getFeaturedEvents } from "../../../helpers/api";

export const dynamicParams = "blocking";

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const event = await getEventById(id);

  return {
    title: event.title,
    description: "Find a lot of great events that allow you to evolve...",
  };
};

const getStaticProps = async (id) => {
  const event = await getEventById(id, { revalidate: 30 });

  return event;
};

export const generateStaticParams = async () => {
  const events = await getFeaturedEvents();

  return events.map((event) => ({ id: event.id }));
};

const EventDetails = async ({ params }) => {
  const event = await getStaticProps(params.id);

  return <EventDetailsPage event={event} />;
};

export default EventDetails;
