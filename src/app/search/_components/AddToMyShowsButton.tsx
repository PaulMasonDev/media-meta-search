import { SignedIn } from "@clerk/nextjs";
// import { addToMyShows } from "~/server/search-queries";
import { type TvShow } from "~/server/types/search-types";

export const AddToMyShowsButton = ({
  show,
  isMyShow,
}: {
  show: TvShow;
  isMyShow: boolean;
}) => {
  const handleAdd = async () => {
    const response = await fetch("/api/my-shows", {
      method: "POST",
      body: JSON.stringify({ showId: show.id, name: show.name }),
    });
    if (!response.ok) {
      throw new Error("Failed to add show to my shows");
    }
  };
  const handleDelete = async () => {
    const response = await fetch("/api/my-shows", {
      method: "DELETE",
      body: JSON.stringify({ showId: show.id }),
    });
    if (!response.ok) {
      throw new Error("Failed to delete show from my shows");
    }
  };
  return (
    <div className="">
      <SignedIn>
        {isMyShow ? (
          <button onClick={handleDelete}>
            This show is already in your shows
          </button>
        ) : (
          <button onClick={handleAdd}>Add to my shows</button>
        )}
      </SignedIn>
    </div>
  );
};
