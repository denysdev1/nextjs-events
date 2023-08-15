"use client";

import useSWR from "swr";
import EventList from "../../../components/events/EventList";
import ResultsTitle from "../../../components/events/ResultsTitle";
import Button from "../../../components/ui/Button";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const FilteredEventsPage = () => {
  const [loadedEvents, setLoadedEvents] = useState();
  const params = useParams();
  const filterData = params.slug;

  const { data, error } = useSWR(
    "https://nextjs-events-a76c3-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = filterData;
  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });
  const eventDate = new Date(numYear, numMonth - 1);

  return filteredEvents.length ? (
    <>
      <ResultsTitle date={eventDate} />
      <EventList events={filteredEvents} />
    </>
  ) : (
    <>
      <ErrorAlert>
        <p>No events found for the chosen filter!</p>
      </ErrorAlert>
      <div className="center">
        <Button link="/events">Show All Events</Button>
      </div>
    </>
  );
};

export default FilteredEventsPage;
