"use client";

import { useShowsContext } from "~/app/search/shows-context";
import { useShowData } from "../../_hooks/useShowData";
import { sortShows } from "~/server/search-queries";
import ShowList from "~/app/_components/show/ShowList";

const MyShowRecommendations = () => {
  const { myShowRecommendations } = useShowsContext();
  const { myShowIds } = useShowData();

  return (
    <div className="m-4 mt-1 flex flex-col items-center justify-center">
      <h1 className="p-4 text-xl font-bold sm:text-3xl">
        My Show Recommendations
      </h1>
      <div>
        <ShowList
          shows={sortShows(myShowRecommendations)}
          myShowIds={myShowIds}
          reason={true}
        />
      </div>
    </div>
  );
};

export default MyShowRecommendations;
