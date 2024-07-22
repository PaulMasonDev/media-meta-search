"use client";

import Link from "next/link";
import { useSearchContext } from "../search/search-context";

const MyShowRecommendations = () => {
  const { myShowRecommendations } = useSearchContext();
  return (
    <div className="m-4 mt-1 flex flex-col items-center justify-center">
      <h1 className="p-4 text-xl font-bold sm:text-3xl">
        My Show Recommendataions
      </h1>
      {myShowRecommendations.map((recommendation) => {
        const name = recommendation.showName;
        return (
          <div key={name} className="p-4">
            <Link href={`/search?searchTerm=${name}`}>
              <h2 className="text-xl font-bold">
                Search for {name}. Click Me!
              </h2>
            </Link>
            <p>{recommendation.reason}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MyShowRecommendations;
