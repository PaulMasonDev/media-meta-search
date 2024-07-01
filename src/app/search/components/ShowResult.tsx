import { type TvShow } from "~/search-types";

export const ShowResult = ({ show }: TvShow) => {
  return (
    <div>
      <h1>{show.name}</h1>
      <img src={show.image.medium} alt={show.name} />
      <p>{show.summary}</p>
    </div>
  );
};
