import { getAllEvents } from "../../helpers/api";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { useRouter } from "next/router";
import Head from "next/head";

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
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
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
