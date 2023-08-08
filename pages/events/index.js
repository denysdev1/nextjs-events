import { getAllEvents } from "../../helpers/api";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { useRouter } from "next/router";

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

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return { props: { events }, revalidate: 60 };
};
