import Head from "next/head";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api";

const HomePage = ({ featuredEvents }) => {
  if (!featuredEvents) {
    return <p>No data yet</p>;
  }

  return (
    <>
      <Head>
        <title>Events App</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventList events={featuredEvents} />
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return { props: { featuredEvents }, revalidate: 1800 };
};
