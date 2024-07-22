import { type TvShow } from "~/server/types/search-types";

export const fetchMyShows = async () => {
  const response = await fetch("/api/my-show-results");
  if (!response.ok) {
    throw new Error("Failed to fetch my shows");
  }
  const fetchedShows = (await response.json()) as TvShow[];
  return fetchedShows;
};

export const fetchShowRecommendations = async (showNames: string[]) => {
  const response = await fetch("/api/my-show-recommendations", {
    method: "POST",
    body: JSON.stringify({ names: showNames }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch show recommendations");
  }
  const recommendations = (await response.json()) as TvShow[];
  return recommendations;
};
