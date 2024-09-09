import {
  ActionSVG,
  AdventureSVG,
  ChildrenSVG,
  ComedySVG,
  DramaSVG,
  FamilySVG,
  FantasySVG,
  HorrorSVG,
  LegalSVG,
  MysterySVG,
  RomanceSVG,
  SciFiSVG,
  SupernaturalSVG,
  ThrillerSVG,
} from "~/SVG/genres";

export const getGenreSVG = (genre: string) => {
  switch (genre) {
    case "Action":
      return <ActionSVG />;
    case "Adventure":
      return <AdventureSVG />;
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
    case "Legal":
      return <LegalSVG />;
    case "Mystery":
      return <MysterySVG />;
    case "Romance":
      return <RomanceSVG />;
    case "Science-Fiction":
      return <SciFiSVG />;
    case "Supernatural":
      return <SupernaturalSVG />;
    case "Thriller":
      return <ThrillerSVG />;
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
