'use client';

import EventList from "../components/events/EventList";
import { NewsletterRegistration } from "../components/input/NewsletterRegistration";

const HomePage = async ({ featuredEvents }) => {
  if (!featuredEvents) {
    return <p>No data yet</p>;
  }

  return (
    <>
      <NewsletterRegistration />
      <EventList events={featuredEvents} />
    </>
  );
};

export default HomePage;
