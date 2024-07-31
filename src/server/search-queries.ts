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
  const showsWithNextEpisode = shows.filter((show) => show._links.nextepisode);
  const showsWithoutNextEpisode = shows.filter(
    (show) => !show._links.nextepisode,
  );
  return [...showsWithNextEpisode, ...showsWithoutNextEpisode];
};
// const sortShowsByCurrentlyRunningFirst = (shows: TvShow[]) => {
//   const runningShows = shows.filter((show) => show.status === "Running");
//   const endedShows = shows.filter((show) => show.status === "Ended");
//   return [...runningShows, ...endedShows];
// };

//TODO: Reintroduce once sorting is decided on more
// const sortShowsByRunningStatus = (shows: TvShow[]) => {
//   //Sort by running status and then the ended shows should be sorted by ended date
//   const runningShows = shows.filter((show) => show.status === "Running");
//   const endedShows = shows.filter((show) => show.status === "Ended");
//   const sortedRunningShows = runningShows.sort((a, b) => {
//     if (a.premiered < b.premiered) {
//       return 1;
//     }
//     if (a.premiered > b.premiered) {
//       return -1;
//     }
//     return 0;
//   });
//   const sortedEndedShows = endedShows.sort((a, b) => {
//     if (a.ended < b.ended) {
//       return 1;
//     }
//     if (a.ended > b.ended) {
//       return -1;
//     }
//     return 0;
//   });
//   return [...sortedRunningShows, ...sortedEndedShows];
// };
