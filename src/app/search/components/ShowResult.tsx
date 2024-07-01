import Link from "next/link";
import { type TvShow } from "~/server/types/search-types";
import { GenresDisplay } from "./GenresDisplay";

export const ShowResult = ({ show }: TvShow) => {
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
        </div>
      </div>
      <div
        className="flex"
        dangerouslySetInnerHTML={{ __html: show.summary }}
      ></div>
      <div className="flex flex-wrap">
        <div>show.webChannel: </div>{" "}
        <div>{JSON.stringify(show.webChannel)}</div>
      </div>
      <div className="flex flex-wrap">
        <div>show.genres: </div> <div>{show.genres.join(", ")}</div>
      </div>
      <div className="flex flex-wrap">
        <div>show.language: </div> <div>{show.language}</div>
      </div>
      <div className="flex flex-wrap">
        <div>show.status: </div> <div>{show.status}</div>
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
