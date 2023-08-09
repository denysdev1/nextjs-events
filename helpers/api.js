const BASE_URL =
  "https://nextjs-events-a76c3-default-rtdb.europe-west1.firebasedatabase.app/";

export const getAllEvents = async () => {
  const response = await fetch(BASE_URL + "events.json");
  const data = await response.json();
  const transformedEvents = [];

  for (const key in data) {
    transformedEvents.push({ id: key, ...data[key] });
  }

  return transformedEvents;
};

export const getFeaturedEvents = async () => {
  const events = await getAllEvents();

  return events.filter((event) => event.isFeatured);
};

export const getEventById = async (id) => {
  const response = await fetch(BASE_URL + `events/${id}.json`);
  const data = await response.json();

  return { id, ...data };
};

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;
  const events = await getAllEvents();

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
