"use client";

import { ShowResult } from "../../_components/ShowResult";
import { useShowData } from "../../_hooks/useShowData";
import { useSearchContext } from "../../search/search-context";

const MyShowRecommendations = () => {
  const { myShowRecommendations } = useSearchContext();
  const { myShowIds } = useShowData();

  return (
    <div className="m-4 mt-1 flex flex-col items-center justify-center">
      <h1 className="p-4 text-xl font-bold sm:text-3xl">
        My Show Recommendations
      </h1>
      {myShowRecommendations?.map((result) => (
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
