"use client";

import { useEffect, useState } from "react";
import { type TvShow } from "~/server/types/search-types";
import { getTVShowsBySearchTerm } from "~/server/search-queries";
import { useShowData } from "~/app/_hooks/useShowData";
import ShowList from "./show/ShowList";
import { useSearchParams } from "next/navigation";

export const SearchResults = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const [searchResults, setSearchResults] = useState<TvShow[]>([]);
  const { myShowIds } = useShowData();

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const results = await getTVShowsBySearchTerm(searchTerm ?? "");
        setSearchResults(results);
      } catch (error) {
        console.error("Failed to fetch TV shows:", error);
        setSearchResults([]);
      }
    };

    if (searchTerm) {
      void fetchTVShows();
    }
  }, [searchTerm]);

  return (
    <>
      <h1 className="p-4 text-xl font-bold sm:text-3xl">
        Showing results for {`"${searchTerm}"`}
      </h1>
      <ShowList shows={searchResults} myShowIds={myShowIds} />
    </>
  );
};
