"use client";

import { useShowsContext } from "~/app/search/shows-context";
import { useShowData } from "../../_hooks/useShowData";
import { ShowResult } from "~/app/_components/show/ShowResult";
import { sortShows } from "~/server/search-queries";

const MyShowRecommendations = () => {
  const { myShowRecommendations } = useShowsContext();
  const { myShowIds } = useShowData();

  return (
    <div className="m-4 mt-1 flex flex-col items-center justify-center">
      <h1 className="p-4 text-xl font-bold sm:text-3xl">
        My Show Recommendations
      </h1>
      {sortShows(myShowRecommendations)?.map((result) => (
        <div key={result.id}>
          <p>
            Reason for {result.name}: {result.reason}
          </p>
          <ShowResult
            key={result.id}
            show={result}
            isMyShow={myShowIds.includes(result.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default MyShowRecommendations;
