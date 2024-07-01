import { type TvShow } from "~/search-types";

export const ShowResult = ({ show }: TvShow) => {
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 text-black shadow-lg">
      <div className="flex flex-col items-center">
        <h1>{show.name}</h1>
        <img src={show.image.medium} alt={show.name} />
      </div>
      <div
        className="flex"
        dangerouslySetInnerHTML={{ __html: show.summary }}
      ></div>
    </div>
  );
};
