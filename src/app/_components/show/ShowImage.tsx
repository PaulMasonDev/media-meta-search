import Link from "next/link";
import { type TvShow } from "~/server/types/search-types";

const ShowImage = ({
  show,
  figCaption = true,
  width,
  height,
}: {
  show: TvShow;
  figCaption?: boolean;
  width?: number;
  height?: number;
}) => {
  return (
    <>
      {show.image?.medium ? (
        <figure>
          <Link
            href={show.officialSite ?? show.url}
            referrerPolicy="no-referrer"
            target="_blank"
          >
            <img
              src={show.image?.medium}
              width={width ?? 400}
              height={height ?? 400}
              alt={show.name}
            />
          </Link>
          {figCaption && (
            <figcaption className="text-center text-xs">
              Image © TV Maze, used under{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
              >
                CC BY-SA 4.0
              </a>
            </figcaption>
          )}
        </figure>
      ) : (
        <h2 className="text-center">{show.name}</h2>
      )}
    </>
  );
};

export default ShowImage;
