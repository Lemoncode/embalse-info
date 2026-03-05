import { useState, useEffect } from "react";
import { EmbalseSearchModel } from "../../embalse-search.vm";

export const useRecentSearches = () => {
  const [newSearch, setNewSearch] = useState<EmbalseSearchModel>(null);
  const [recentSearches, setRecentSearches] = useState<EmbalseSearchModel[]>(
    [],
  );

  useEffect(() => {
    const storedSearches = localStorage.getItem("recent-searches");
    if (storedSearches) {
      const parsedStoredSearches = JSON.parse(storedSearches);
      setRecentSearches(parsedStoredSearches);
    }
  }, []);

  useEffect(() => {
    if (newSearch) {
      setRecentSearches((prevSearches) => {
        const filteredRecentSearches = prevSearches.filter(
          (search) => search.slug !== newSearch.slug,
        );
        return [newSearch, ...filteredRecentSearches].slice(0, 5);
      });
    }
  }, [newSearch]);

  useEffect(() => {
    if (recentSearches.length > 0) {
      const stringfiedRecentSearches = JSON.stringify(recentSearches);
      localStorage.setItem("recent-searches", stringfiedRecentSearches);
    }
  }, [recentSearches]);

  return {
    newSearch,
    setNewSearch,
    recentSearches,
    setRecentSearches,
  };
};
