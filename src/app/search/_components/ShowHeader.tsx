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
        <img src={show.image?.medium} width={400} alt={show.name} />
      </Link>
      <GenresDisplay id={show.id} genres={show.genres} />
      {<NextEpisode show={show} />}
      {show.status === "Ended" && (
        <em className="flex flex-col items-center font-thin">
          Show ended on {new Date(show.ended).toLocaleDateString()}.
        </em>
      )}
    </div>
  );
};
