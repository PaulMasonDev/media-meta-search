"use client";

import { useEffect, useState } from "react";
import { type TvShow } from "~/server/types/search-types";
import { getTVShowsBySearchTerm, sortShows } from "~/server/search-queries";
import { ShowResult } from "./ShowResult";

interface SearchResultsProperties {
  searchTerm: string;
}

export const SearchResults = (props: SearchResultsProperties) => {
  const [searchResults, setSearchResults] = useState<TvShow[]>([]);
  const [myShowIds, setMyShowIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchMyShows = async () => {
      const response = await fetch("/api/my-shows");
      if (!response.ok) {
        throw new Error("Failed to fetch my shows");
      }
      const fetchedShowIds = (await response.json()) as number[];
      setMyShowIds(fetchedShowIds);
    };
    void fetchMyShows();
  }, []);

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

  return (
    <div className="grid grid-cols-1 gap-6 p-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {searchResults?.map((result) => {
        return (
          <ShowResult
            key={result.id}
            show={result}
            isMyShow={myShowIds.includes(result.id)}
          />
        );
      })}
    </div>
  );
};
