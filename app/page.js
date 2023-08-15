import HomePage from "./home-page";
import { getFeaturedEvents } from "../helpers/api";

export const metadata = {
  title: "Events App",
  description: "Find a lot of great events that allow you to evolve...",
};

const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents({
    next: { revalidate: 1800 },
  });

  return featuredEvents;
};

const Page = async () => {
  const featuredEvents = await getStaticProps();

  return <HomePage featuredEvents={featuredEvents} />;
};

export default Page;
