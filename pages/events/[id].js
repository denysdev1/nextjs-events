import EventSummary from "../../components/event-details/EventSummary";
import EventLogistics from "../../components/event-details/EventLogistics";
import EventContent from "../../components/event-details/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getEventById } from "../../dummy-data";
import { useRouter } from "next/router";

const EventDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const event = getEventById(id);

  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>Event not found!</p>
        </ErrorAlert>
      </>
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
