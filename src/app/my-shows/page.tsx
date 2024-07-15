"use client";

import { useEffect, useState } from "react";
import { type TvShow } from "~/server/types/search-types";
import { ShowResult } from "../search/_components/ShowResult";
import { SearchProvider, useSearchContext } from "../search/search-context";

const MyShowsPageWrapped = () => {
  return (
    <SearchProvider>
      <MyShowsPage />
    </SearchProvider>
  );
};

const MyShowsPage = () => {
  const { myShows } = useSearchContext();

  console.log({ myShows });

  return (
    <div className="m-4 mt-1 flex flex-col items-center justify-center">
      <h1 className="p-4 text-xl font-bold sm:text-3xl">My Shows</h1>
      <div className="grid grid-cols-1 gap-6 p-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {myShows?.map((result) => {
          return <ShowResult key={result.id} show={result} isMyShow={true} />;
        })}
      </div>
    </div>
  );
};

export default MyShowsPageWrapped;
