import { SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above to access your shows
        </div>
      </SignedOut>
    </main>
  );
}
