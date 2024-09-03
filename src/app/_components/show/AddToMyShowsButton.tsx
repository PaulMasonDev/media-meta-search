"use client";

import { SignedIn } from "@clerk/nextjs";
import { type TvShow } from "~/server/types/search-types";
import { useEffect, useState } from "react";
import { useShowsContext } from "../../search/shows-context";

export const AddToMyShowsButton = ({
  show,
  isMyShow,
}: {
  show: TvShow;
  isMyShow: boolean;
}) => {
  const { updateShows, myShows } = useShowsContext();

  const [isProcessing, setIsProcessing] = useState(false);
  const [canAdd, setCanAdd] = useState(false);

  const maxShows = 20; // Maybe this can be tied to user setting depending on subscription

  const handleAdd = async () => {
    setIsProcessing(true);
    const response = await fetch("/api/my-show-ids", {
      method: "POST",
      body: JSON.stringify({ showId: show.id, name: show.name }),
    });
    if (!response.ok) {
      throw new Error("Failed to add show to my shows");
    }
    await updateShows();
    setIsProcessing(false);
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    const response = await fetch("/api/my-show-ids", {
      method: "DELETE",
      body: JSON.stringify({ showId: show.id }),
    });
    if (!response.ok) {
      throw new Error("Failed to delete show from my shows");
    }
    await updateShows();
    setIsProcessing(false);
  };

  useEffect(() => {
    setCanAdd(myShows.length < maxShows);
  }, [myShows]);

  return (
    <div className="flex items-center justify-center">
      <SignedIn>
        {isProcessing ? (
          <div>Processing</div>
        ) : isMyShow ? (
          <button
            className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
            onClick={handleDelete}
          >
            Remove from My Shows
          </button>
        ) : canAdd ? (
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={handleAdd}
          >
            Add to my shows
          </button>
        ) : (
          <em>You can only add a max of {maxShows} shows.</em>
        )}
      </SignedIn>
    </div>
  );
};
