import { type TvShow } from "~/server/types/search-types";

import { ShowHeader } from "./ShowHeader";
import { AddToMyShowsButton } from "./AddToMyShowsButton";
import { NetflixSVG } from "~/SVG/streamers";
import ShowStreamer from "./ShowStreamer";

export const ShowResult = ({
  show,
  isMyShow,
}: {
  show: TvShow;
  isMyShow: boolean;
}) => {
  console.log(show.name, show.webChannel?.name, show);
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 text-black shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <ShowHeader show={show} />
      </div>
      <AddToMyShowsButton show={show} isMyShow={isMyShow} />
      {show.summary && (
        <div
          dangerouslySetInnerHTML={{
            __html: show.summary,
          }}
        ></div>
      )}
    </div>
  );
};
