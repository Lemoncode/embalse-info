import { EmbalseSearchModel } from "../../embalse-search.vm";

  const MAX_SEARCHES = 5;

export const getStoredSearches = (): EmbalseSearchModel[] => {
  try {
    const storedSearches = localStorage.getItem("recent-searches");
    if (storedSearches) {
      const parsedStoredSearches = JSON.parse(storedSearches);
      const isValidData =
        Array.isArray(parsedStoredSearches) &&
        parsedStoredSearches.every(
          (item) =>
            item &&
            typeof item.slug === "string" &&
            typeof item.name === "string",
        );
      return isValidData ? parsedStoredSearches : [];
    } else {
      return [];
    }
  } catch (error) {
    console.log(
      "Error al recuperar búsquedas recientes en el localstorage ",
      error,
    );
    return [];
  }
};

export const addNewSearchEntry = (
  newSearchEntry: EmbalseSearchModel,
  recentSearches: EmbalseSearchModel[],
) => {
  const filteredRecentSearches = recentSearches.filter(
    (search) => search.slug !== newSearchEntry.slug,
  );
  return [newSearchEntry, ...filteredRecentSearches].slice(0, MAX_SEARCHES);
};


