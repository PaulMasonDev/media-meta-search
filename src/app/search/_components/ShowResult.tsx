import { type TvShow } from "~/server/types/search-types";

import { ShowHeader } from "./ShowHeader";
import { AddToMyShowsButton } from "./AddToMyShowsButton";

export const ShowResult = ({
  show,
  isMyShow,
}: {
  show: TvShow;
  isMyShow: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 text-black shadow-lg">
      <AddToMyShowsButton show={show} isMyShow={isMyShow} />
      <div className="flex flex-col items-center gap-4">
        <ShowHeader show={show} />
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
