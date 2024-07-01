import {
  type TvEpisode,
  type TvShow,
  type TvShowWithScore,
} from "~/server/types/search-types";

export const getTVShowsBySearchTerm = async (searchTerm: string) => {
  const response = await fetch(
    `https://api.tvmaze.com/search/shows?q=${searchTerm}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch TV shows");
  }
  const data: TvShowWithScore[] = (await response.json()) as TvShowWithScore[];
  return data.map((show) => show.show);
};

export const getEpisodeById = async (id: number) => {
  const response = await fetch(`https://api.tvmaze.com/episodes/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch episode");
  }
  const data: TvEpisode = (await response.json()) as TvEpisode;
  return data;
};
