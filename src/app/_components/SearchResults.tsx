// components/SearchResults.tsx
"use client";

import { useEffect, useState } from "react";
import { type TvShow } from "~/server/types/search-types";
import { getTVShowsBySearchTerm, sortShows } from "~/server/search-queries";
import { useShowData } from "~/app/_hooks/useShowData";
import ShowList from "~/app/_components/ShowList";

interface SearchResultsProperties {
  searchTerm: string;
}

export const SearchResults = (props: SearchResultsProperties) => {
  const [searchResults, setSearchResults] = useState<TvShow[]>([]);
  const { myShowIds } = useShowData();

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const results = await getTVShowsBySearchTerm(props.searchTerm);
        setSearchResults(sortShows(results));
      } catch (error) {
        console.error("Failed to fetch TV shows:", error);
        setSearchResults([]);
      }
    };

    if (props.searchTerm) {
      void fetchTVShows();
    }
  }, [props.searchTerm]);

  return <ShowList shows={searchResults} myShowIds={myShowIds} />;
};
