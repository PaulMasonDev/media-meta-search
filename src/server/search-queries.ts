import {
  type TvShow,
  type TvEpisode,
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

  const shows = data.map((show) => show.show);
  const showsWithScore = shows.map((show) => {
    return {
      ...show,
      score: data.find((s) => s.show.id === show.id)?.score,
    };
  });
  return showsWithScore;
};

export const getEpisodeById = async (id: number) => {
  const response = await fetch(`https://api.tvmaze.com/episodes/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch episode");
  }
  const data: TvEpisode = (await response.json()) as TvEpisode;
  return data;
};

export const sortShows = (shows: TvShow[]) => {
  // return sortShowsByRunningStatus(shows);
  return sortShowsByUpcomingEpisodesFirst(shows);
  // return shows;
};

const sortShowsByUpcomingEpisodesFirst = (shows: TvShow[]) => {
  const showsWithNextEpisode = shows
    .filter((show) => show.nextEpisode)
    .sort((a, b) => {
      if (a.nextEpisode?.airdate && b.nextEpisode?.airdate) {
        const aDate = new Date(a.nextEpisode.airdate);
        const bDate = new Date(b.nextEpisode.airdate);
        if (aDate < bDate) {
          return -1;
        }
        if (aDate > bDate) {
          return 1;
        }
        return 0;
      }
      return 0;
    });
  const showsWithoutNextEpisode = shows.filter(
    (show) => !show._links.nextepisode,
  );
  return [...showsWithNextEpisode, ...showsWithoutNextEpisode];
};
