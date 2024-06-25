"use client";

import { useSearchParams } from "next/navigation";

const SearchLandingPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");

  return (
    <div className="m-4 flex justify-center">
      <h1 className="text-xl font-bold">
        Showing results for {`"${searchTerm}"`}
      </h1>
    </div>
  );
};

export default SearchLandingPage;
