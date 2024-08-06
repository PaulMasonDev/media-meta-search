import Link from "next/link";

const SeriesRecap = ({ showName }: { showName: string }) => {
  return (
    <Link
      className="text-sm text-blue-500 visited:text-purple-500"
      referrerPolicy="no-referrer"
      target="_blank"
      href={`https://www.youtube.com/results?search_query=${showName}+recap`}
    >
      SERIES RECAP
    </Link>
  );
};

export default SeriesRecap;
