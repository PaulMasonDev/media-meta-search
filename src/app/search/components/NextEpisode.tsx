"use client";

import { useState, useEffect } from "react";
import { type TvShow, type TvEpisode } from "~/server/types/search-types";

export const NextEpisode = ({ show }: { show: TvShow }) => {
  const [nextEpisode, setNextEpisode] = useState<null | TvEpisode>(null);

  const showNextEpisode = show._links.nextepisode;

  useEffect(() => {
    const fetchNextEpisode = async () => {
      if (showNextEpisode) {
        const response = await fetch(showNextEpisode.href);
        if (!response.ok) {
          throw new Error("Failed to fetch next episode");
        }
        const data: TvEpisode = (await response.json()) as TvEpisode;
        setNextEpisode(data);
      }
    };
    void fetchNextEpisode();
  }, [showNextEpisode]);
  return nextEpisode ? (
    <h3 className="flex flex-wrap">
      <div className="">
        {`S${nextEpisode.season}:E${nextEpisode.number} "${nextEpisode.name}"`}{" "}
        airs on {new Date(nextEpisode?.airdate).toLocaleDateString()}
      </div>
    </h3>
  ) : null;
};
