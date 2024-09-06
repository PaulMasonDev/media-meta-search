"use client";

import { type TvShow } from "~/server/types/search-types";
import { ShowResult } from "./ShowResult";
import { filterByRunningStatus } from "~/server/search-queries";
import { useState } from "react";

interface ShowListProps {
  shows: TvShow[];
  myShowIds: number[];
  reason?: boolean;
}

const ShowList = ({ shows, myShowIds, reason }: ShowListProps) => {
  const [runningStatus, setRunningStatus] = useState(false);

  const filteredShows = runningStatus
    ? filterByRunningStatus(shows, true)
    : shows;

  return (
    <div className="w-full">
      <h3 className="text-center">
        Showing {filteredShows.length} of {filteredShows.length} shows
      </h3>
      <div className="mb-3 ml-1 flex items-center justify-center gap-1">
        <input
          type="checkbox"
          checked={runningStatus}
          onChange={() => setRunningStatus(!runningStatus)}
        />
        Show currently running shows only
      </div>

      <div className="grid grid-cols-1 gap-6 p-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredShows?.map((result) => (
          <div key={result.id} className="flex flex-col gap-6">
            {reason && (
              <p className="rounded-md bg-slate-400 p-3">
                Reason for {result.name}: {result.reason}
              </p>
            )}
            <ShowResult
              key={result.id}
              show={result}
              isMyShow={myShowIds.includes(result.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
