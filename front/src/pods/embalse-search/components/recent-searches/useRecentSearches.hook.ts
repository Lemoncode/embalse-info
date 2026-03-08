import { useState, useEffect } from "react";
import { EmbalseSearchModel } from "../../embalse-search.vm";
import {
  addNewSearchEntry,
  getStoredSearches,
} from "./recentSearches.bussiness";

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<EmbalseSearchModel[]>(
    [],
  );

  useEffect(() => {
    setRecentSearches(getStoredSearches());
  }, []);

  const addNewEmbalseToLatestSearchCollection = (
    newSearch: EmbalseSearchModel,
  ) => {
    setRecentSearches((prevSearches) => {
      const updatedRecentSearchColletion = addNewSearchEntry(
        newSearch,
        prevSearches,
      );
      localStorage.setItem(
        "recent-searches",
        JSON.stringify(updatedRecentSearchColletion),
      );
      return updatedRecentSearchColletion;
    });
  };

  return {
    recentSearches,
    addNewEmbalseToLatestSearchCollection,
  };
};
