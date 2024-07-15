import { SignedOut } from "@clerk/nextjs";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above to add shows to your list after searching
        </div>
      </SignedOut>
      <div className="h-full w-full text-center text-2xl">
        Search for a show above to get started
      </div>
    </main>
  );
}
