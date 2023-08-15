const BASE_URL =
  "https://nextjs-events-a76c3-default-rtdb.europe-west1.firebasedatabase.app/";

export const getAllEvents = async (options) => {
  const response = await fetch(BASE_URL + "events.json", options);
  const data = await response.json();
  const transformedEvents = [];

  for (const key in data) {
    transformedEvents.push({ id: key, ...data[key] });
  }

  return transformedEvents;
};

export const getFeaturedEvents = async (options) => {
  const events = await getAllEvents(options);

  return events.filter((event) => event.isFeatured);
};

export const getEventById = async (id, options) => {
  const response = await fetch(BASE_URL + `events/${id}.json`, options);
  const data = await response.json();

  return { id, ...data };
};

export const getFilteredEvents = async (dateFilter, options) => {
  const { year, month } = dateFilter;
  const events = await getAllEvents(options);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
