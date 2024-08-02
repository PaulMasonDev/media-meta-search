"use client";

import { useEffect, useState } from "react";
import { fetchShowRecommendations } from "../client-library";
import { useRouter } from "next/navigation";
import { useShowData } from "../_hooks/useShowData";
import { useShowsContext } from "../search/shows-context";
import ShowList from "../_components/show/ShowList";
import { sortShows } from "~/server/search-queries";

const MyShowsPage = () => {
  const router = useRouter();
  const { myShows, setMyShowRecommendations, isLoading } = useShowsContext();
  const { myShowIds } = useShowData();
  const [showNames, setShowNames] = useState<string[]>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  useEffect(() => {
    setShowNames(myShows.map((show) => show.name));
  }, [myShows]);

  const handleClickRecommendations = async () => {
    setIsLoadingRecs(true);
    const recommendations = await fetchShowRecommendations(showNames);
    setIsLoadingRecs(false);
    setMyShowRecommendations(recommendations);
    router.push("/my-shows/recommendations");
  };

  if (isLoading) {
    return <p>Loading your shows...</p>;
  } else {
    return (
      <div className="m-4 mt-1 flex flex-col items-center justify-center">
        <h1 className="p-4 text-xl font-bold sm:text-3xl">My Shows</h1>
        {isLoadingRecs ? (
          <p>Loading your recommendations...</p>
        ) : (
          <button onClick={handleClickRecommendations}>
            Show Recommendations
          </button>
        )}
        <ShowList shows={sortShows(myShows)} myShowIds={myShowIds} />
      </div>
    );
  }
};

export default MyShowsPage;
