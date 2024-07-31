import { type TvShow } from "~/server/types/search-types";
import ShowImage from "./ShowImage";
import { GenresDisplay } from "../GenresDisplay";
import { NextEpisode } from "../NextEpisode";

export const ShowHeader = ({ show }: { show: TvShow }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <ShowImage show={show} />
      <GenresDisplay id={show.id} genres={show.genres} />
      {<NextEpisode show={show} />}
    </div>
  );
};
