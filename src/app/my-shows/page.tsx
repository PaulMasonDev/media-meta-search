"use client";

import { useEffect, useState } from "react";
import { useSearchContext } from "../search/search-context";
import { fetchShowRecommendations } from "../client-library";
import { useRouter } from "next/navigation";
import { useShowData } from "../_hooks/useShowData";
import ShowList from "../_components/ShowList";

const MyShowsPage = () => {
  const router = useRouter();
  const { myShows, setMyShowRecommendations } = useSearchContext();
  const { myShowIds } = useShowData();
  const [showNames, setShowNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setShowNames(myShows.map((show) => show.name));
  }, [myShows]);

  const handleClickRecommendations = async () => {
    setIsLoading(true);
    const recommendations = await fetchShowRecommendations(showNames);
    setIsLoading(false);
    setMyShowRecommendations(recommendations);
    router.push("/my-shows/recommendations");
  };

  return (
    <div className="m-4 mt-1 flex flex-col items-center justify-center">
      <h1 className="p-4 text-xl font-bold sm:text-3xl">My Shows</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handleClickRecommendations}>
          Show Recommendations
        </button>
      )}
      <ShowList shows={myShows} myShowIds={myShowIds} />
    </div>
  );
};

export default MyShowsPage;
