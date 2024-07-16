"use client";

import { useEffect, useState } from "react";
import { ShowResult } from "../search/_components/ShowResult";
import { SearchProvider, useSearchContext } from "../search/search-context";
import { fetchShowRecommendations } from "../search/client-library";

const MyShowsPageWrapped = () => {
  return (
    <SearchProvider>
      <MyShowsPage />
    </SearchProvider>
  );
};

const MyShowsPage = () => {
  const { myShows } = useSearchContext();
  const [showNames, setShowNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setShowNames(myShows.map((show) => show.name));
  }, [myShows]);

  const handleClickRecommendations = async () => {
    setIsLoading(true);
    const recommendations = await fetchShowRecommendations(showNames);
    setIsLoading(false);
    alert(recommendations);
  };

  return (
    <div className="m-4 mt-1 flex flex-col items-center justify-center">
      <h1 className="p-4 text-xl font-bold sm:text-3xl">My Shows</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handleClickRecommendations}>
          Show Reccomendations
        </button>
      )}
      <div className="grid grid-cols-1 gap-6 p-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {myShows?.map((result) => {
          return <ShowResult key={result.id} show={result} isMyShow={true} />;
        })}
      </div>
    </div>
  );
};

export default MyShowsPageWrapped;
