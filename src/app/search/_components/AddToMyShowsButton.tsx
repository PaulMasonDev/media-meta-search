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
    <div className="flex items-center justify-center">
      <SignedIn>
        {isMyShow ? (
          <button
            className="focus:shadow-outline rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 focus:outline-none"
            onClick={handleDelete}
          >
            Remove from My Shows
          </button>
        ) : (
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            onClick={handleAdd}
          >
            Add to my shows
          </button>
        )}
      </SignedIn>
    </div>
  );
};
