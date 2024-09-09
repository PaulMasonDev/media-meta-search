"use client";

import { type TvShow } from "~/server/types/search-types";

import ShowImage from "./ShowImage";
import { getGenreSVG } from "./GenresDisplay";
import { AddToMyShowsButton } from "./AddToMyShowsButton";
import { useState } from "react";

const extractYear = (dateString: string): string => {
  return dateString.split("-")[0] ?? "";
};

export const ShowResultB = ({
  show,
  isMyShow,
}: {
  show: TvShow;
  isMyShow: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full bg-white text-black">
      <div className="flex w-full justify-between">
        <div className="w-1/3">
          <ShowImage show={show} width={125} height={125} figCaption={false} />
        </div>
        <div className="flex w-2/3 flex-col p-2">
          <div className="self-end">
            TV Show{" "}
            <button onClick={() => setExpanded(!expanded)}>
              {expanded ? "▲" : "▼"}
            </button>
          </div>
          <div className="text-2xl underline">{show.name}</div>
          <div className="flex flex-wrap gap-1 text-white">
            <div className="bg-black p-1 text-sm">
              {show.premiered ? extractYear(show.premiered) : "year*"}
            </div>
            <div className="bg-black p-1 text-sm">seasons*</div>

            {/* <GenresDisplay id={show.id} genres={show.genres} /> */}
          </div>
          <div className="flex">
            {show.genres.map((genre) => (
              <div
                key={genre}
                className="inline bg-white p-1 text-sm text-black"
              >
                {genre === "Science-Fiction" ? "Sci-Fi" : genre}
                {getGenreSVG(genre)}
              </div>
            ))}
          </div>
          <AddToMyShowsButton show={show} isMyShow={isMyShow} />
        </div>
      </div>
      {expanded && show.summary && (
        <div
          className="p-2"
          dangerouslySetInnerHTML={{ __html: show.summary }}
        ></div>
      )}
    </div>
  );
};
