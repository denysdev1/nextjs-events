'use client';

import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { useRouter } from "next/navigation";

const AllEventsPage = ({ events }) => {
  const router = useRouter();

  const handleSearch = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <EventsSearch handleSearch={handleSearch} />
      <EventList events={events} />
    </>
  );
};

export default AllEventsPage;
