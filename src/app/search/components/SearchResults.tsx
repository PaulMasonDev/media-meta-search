"use client";

import { useEffect, useState } from "react";
import { type TvShow } from "~/search-types";
import { getTVShowsBySearchTerm } from "~/server/search-queries";
import { ShowResult } from "./ShowResult";

interface SearchResultsProperties {
  searchTerm: string;
}

export const SearchResults = (props: SearchResultsProperties) => {
  const [searchResults, setSearchResults] = useState<TvShow[]>([]);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const results = await getTVShowsBySearchTerm(props.searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error("Failed to fetch TV shows:", error);
        setSearchResults([]);
      }
    };

    if (props.searchTerm) {
      void fetchTVShows();
    }
  }, [props.searchTerm]);
  //   const searchResults = getTVShowsBySearchTerm(props.searchTerm ?? "");

  return (
    <div>
      {searchResults?.map((result) => {
        // return <div key={result.show.id}>{result.show.name}</div>;
        return (
          <ShowResult
            key={result.show.id}
            show={result.show}
            score={result.score}
          />
        );
      })}
    </div>
  );
};
