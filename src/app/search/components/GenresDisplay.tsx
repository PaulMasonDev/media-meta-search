import {
  ActionSVG,
  ChildrenSVG,
  ComedySVG,
  DramaSVG,
  FamilySVG,
  FantasySVG,
  HorrorSVG,
  MysterySVG,
  RomanceSVG,
  SciFiSVG,
  SupernaturalSVG,
} from "~/SVG/genres";

const getGenreSVG = (genre: string) => {
  switch (genre) {
    case "Action":
      return <ActionSVG />;
    case "Children":
      return <ChildrenSVG />;
    case "Comedy":
      return <ComedySVG />;
    case "Drama":
      return <DramaSVG />;
    case "Family":
      return <FamilySVG />;
    case "Fantasy":
      return <FantasySVG />;
    case "Horror":
      return <HorrorSVG />;
    case "Mystery":
      return <MysterySVG />;
    case "Romance":
      return <RomanceSVG />;
    case "Science-Fiction":
      return <SciFiSVG />;
    case "Supernatural":
      return <SupernaturalSVG />;
    default:
      return null;
  }
};

export const GenresDisplay = ({
  id,
  genres,
}: {
  id: number;
  genres: string[];
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <div key={`${id}-${genre}`} title={`${genre}`}>
          {getGenreSVG(genre)}
        </div>
      ))}
    </div>
  );
};
