import { type TvShow } from "~/server/types/search-types";

import { ShowHeader } from "./ShowHeader";

export const ShowResult = ({ show }: { show: TvShow }) => {
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 text-black shadow-lg">
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
