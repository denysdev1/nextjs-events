import FilteredEventsPage from "./filtered-events-page";

export const generateMetadata = ({ params }) => {
  const [year, month] = params.slug;

  return {
    title: "Filtered Events",
    description: `All events for ${year}/${month}`,
  };
};

const FilteredEvents = () => <FilteredEventsPage />;

export default FilteredEvents;
