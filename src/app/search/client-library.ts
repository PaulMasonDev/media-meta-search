import { type TvShow } from "~/server/types/search-types";

export const fetchMyShows = async () => {
  const response = await fetch("/api/my-show-results");
  if (!response.ok) {
    throw new Error("Failed to fetch my shows");
  }
  const fetchedShows = (await response.json()) as TvShow[];
  return fetchedShows;
};
