"use client";

import EventSummary from '../../../components/event-details/EventSummary';
import EventLogistics from "../../../components/event-details/EventLogistics";
import EventContent from "../../../components/event-details/EventContent";
import { Comments } from "../../../components/input/Comments";

const EventDetailsPage = ({ event }) => {
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
      <Comments eventId={event.id} />
    </>
  );
};

export default EventDetailsPage;
