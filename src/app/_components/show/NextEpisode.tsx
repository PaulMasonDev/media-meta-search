"use client";

import { type TvEpisode } from "~/server/types/search-types";

export const NextEpisode = ({ nextEpisode }: { nextEpisode: TvEpisode }) => {
  const utcDate = new Date(Date.UTC(nextEpisode?.airdate.split('-')[0], nextEpisode?.airdate.split('-')[1] - 1, nextEpisode?.airdate.split('-')[2]));
  const formattedDate = utcDate.toLocaleDateString();
  
  return (
    <h3 className="flex flex-wrap">
      <div className="">
        {`S${nextEpisode.season}:E${nextEpisode.number} ${nextEpisode.name !== "TBA" ? `"${nextEpisode.name} "` : ""}`}
        airing on {formattedDate}
      </div>
<span>{nextEpisode?.airdate}</span>
    </h3>
  );
};
