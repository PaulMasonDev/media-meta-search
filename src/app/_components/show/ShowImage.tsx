import Link from "next/link";
import { type TvShow } from "~/server/types/search-types";

const ShowImage = ({ show }: { show: TvShow }) => {
  return (
    <Link
      href={show.officialSite ?? show.url}
      referrerPolicy="no-referrer"
      target="_blank"
    >
      <figure>
        <img src={show.image?.medium} width={400} alt={show.name} />
        <figcaption className="text-center text-xs">
          Image © TV Maze, used under{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
          >
            CC BY-SA 4.0
          </a>
        </figcaption>
      </figure>
    </Link>
  );
};

export default ShowImage;
