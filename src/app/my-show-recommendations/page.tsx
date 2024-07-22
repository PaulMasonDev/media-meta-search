"use client";

import { useSearchContext } from "../search/search-context";
import { ShowResult } from "../search/_components/ShowResult";
import { useEffect, useState } from "react";

const MyShowRecommendations = () => {
  const { myShowRecommendations, myShows } = useSearchContext();
  const [myShowIds, setMyShowIds] = useState<number[]>([]);

  useEffect(() => {
    setMyShowIds(myShows.map((show) => show.id));
  }, [myShows]);

  return (
    <div className="m-4 mt-1 flex flex-col items-center justify-center">
      <h1 className="p-4 text-xl font-bold sm:text-3xl">
        My Show Recommendations
      </h1>
      {myShowRecommendations?.map((result) => {
        return (
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
        );
      })}
    </div>
  );
};

export default MyShowRecommendations;
