import Link from "next/link";
import { GenresDisplay } from "./GenresDisplay";
import { NextEpisode } from "./NextEpisode";
import { type TvShow } from "~/server/types/search-types";

export const ShowHeader = ({ show }: { show: TvShow }) => {
  return (
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
      {<NextEpisode show={show} />}
      {show.status === "Ended" && (
        <em className="flex flex-col items-center font-thin">
          Show ended on {new Date(show.ended).toLocaleDateString()}.
        </em>
      )}
    </div>
  );
};
