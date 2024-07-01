import Link from "next/link";
import { type TvShow } from "~/server/types/search-types";

export const ShowResult = ({ show }: TvShow) => {
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 text-black shadow-lg">
      {/* <div className="flex flex-col items-center gap-4"> */}
      <Link
        className="flex flex-col items-center gap-4"
        href={show.officialSite ?? show.url}
        referrerPolicy="no-referrer"
        target="_blank"
      >
        <h2 className="font-bold">{show.name}</h2>
        <img src={show.image.medium} alt={show.name} />
      </Link>
      {/* </div> */}
      <div
        className="flex"
        dangerouslySetInnerHTML={{ __html: show.summary }}
      ></div>
    </div>
  );
};
