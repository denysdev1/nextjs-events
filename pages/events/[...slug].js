import { useRouter } from "next/router";
import useSWR from "swr";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { useEffect, useState } from "react";
import Head from "next/head";

const FilteredEvents = () => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;

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
    return (
      <>
        <Head>
          <title>Filtered Events</title>
          <meta name="description" content="A list of filtered events" />
        </Head>
        <p className="center">Loading...</p>
      </>
    );
  }

  const [year, month] = filterData;
  const numYear = +year;
  const numMonth = +month;

  const headContent = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numYear}/${numMonth}`}
      />
    </Head>
  );

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
        {headContent}
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
      {headContent}
      <ResultsTitle date={eventDate} />
      <EventList events={filteredEvents} />
    </>
  ) : (
    <>
      {headContent}
      <ErrorAlert>
        <p>No events found for the chosen filter!</p>
      </ErrorAlert>
      <div className="center">
        <Button link="/events">Show All Events</Button>
      </div>
    </>
  );
};

export default FilteredEvents;

// export const getServerSideProps = async (context) => {
//   const { slug } = context.params;
//   const [year, month] = slug;
//   const numYear = +year;
//   const numMonth = +month;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return { props: { hasError: true } };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: { filteredEvents, date: { year: numYear, month: numMonth } },
//   };
// };
