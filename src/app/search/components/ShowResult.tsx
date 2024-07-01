"use client";

import Link from "next/link";
import { type TvEpisode, type TvShow } from "~/server/types/search-types";
import { GenresDisplay } from "./GenresDisplay";
import { useEffect, useState } from "react";

export const ShowResult = ({ show }: TvShow) => {
  const [nextEpisode, setNextEpisode] = useState<null | TvEpisode>(null);

  useEffect(() => {
    const fetchNextEpisode = async () => {
      if (show._links.nextepisode) {
        const id = parseInt(
          show._links.nextepisode?.href.replace(
            "https://api.tvmaze.com/episodes/",
            "",
          ),
        );
        if (!Number.isNaN(id)) {
          const response = await fetch(show._links.nextepisode.href);
          if (!response.ok) {
            throw new Error("Failed to fetch next episode");
          }
          const data: TvEpisode = (await response.json()) as TvEpisode;
          setNextEpisode(data);
        }
      }
    };
    void fetchNextEpisode();
  }, [show._links.nextepisode]);

  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 text-black shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <Link
            href={show.officialSite ?? show.url}
            referrerPolicy="no-referrer"
            target="_blank"
          >
            <h2 className="font-bold">{show.name}</h2>
          </Link>
          <GenresDisplay id={show.id} genres={show.genres} />
          <img src={show.image?.medium} alt={show.name} />
          {nextEpisode && (
            <h3 className="flex flex-wrap">
              <div className="">
                {`"${nextEpisode.name}"`} airs on{" "}
                {new Date(nextEpisode?.airdate).toLocaleDateString()}
              </div>
            </h3>
          )}
          {show.status === "Ended" && (
            <em className="flex flex-col items-center font-thin">
              Show ended on {new Date(show.ended).toLocaleDateString()}.
            </em>
          )}
        </div>
      </div>
      {show.summary && (
        <div
          dangerouslySetInnerHTML={{
            __html: show.summary,
          }}
        ></div>
      )}
      <div className="flex flex-wrap">
        <div>show.webChannel: </div>{" "}
        <div>{JSON.stringify(show.webChannel)}</div>
      </div>
      <div className="flex flex-wrap">
        <div>show.runtime: </div> <div>{show.runtime}</div>
      </div>
      <div className="flex flex-wrap">
        <div>show.schedule: </div> <div>{show.schedule.time}</div>
      </div>
    </div>
  );
};
