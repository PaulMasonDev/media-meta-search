"use client";

import { useSearchParams } from "next/navigation";
import { SearchResults } from "./_components/SearchResults";

const SearchLandingPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");

  return (
    <div className="m-4 flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold">
        Showing results for {`"${searchTerm}"`}
      </h1>
      <SearchResults searchTerm={searchTerm ?? ""} />
    </div>
  );
};

export default SearchLandingPage;
