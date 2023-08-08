import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api";

const HomePage = ({ featuredEvents }) => {
  if (!featuredEvents) {
    return <p>No data yet</p>;
  }

  return (
    <>
      <EventList events={featuredEvents} />
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return { props: { featuredEvents }, revalidate: 1800 };
};
