import EventSummary from "../../components/event-details/EventSummary";
import EventLogistics from "../../components/event-details/EventLogistics";
import EventContent from "../../components/event-details/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getEventById, getFeaturedEvents } from "../../helpers/api";

const EventDetails = ({ event }) => {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...!</p>
      </div>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetails;

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const event = await getEventById(id);

  return { props: { event } };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { id: event.id } }));

  return { paths, fallback: true };
};
