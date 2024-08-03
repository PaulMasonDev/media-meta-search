"use client";

import { type TvEpisode } from "~/server/types/search-types";

export const NextEpisode = ({ nextEpisode }: { nextEpisode: TvEpisode }) => {
  return (
    <h3 className="flex flex-wrap">
      <div className="">
        {`S${nextEpisode.season}:E${nextEpisode.number} ${nextEpisode.name !== "TBA" ? `"${nextEpisode.name} "` : ""}`}
        airing on {nextEpisode.airdate}
      </div>
    </h3>
  );
};
