import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SearchBox from "../search/_components/SearchBox";
import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-blue-500 p-3 pb-6 pt-6 text-xl font-semibold sm:pr-8">
      <div className="flex items-center justify-center gap-2">
        <Link className="w-14 pl-2 pr-2" href="/">
          <img className="rounded-lg" src="/mms-logo.jpg" alt="" />
        </Link>
        <SearchBox />
        {/* <SignedIn>My Shows</SignedIn> */}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-row items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <div className="pr-2.5 pt-1.5 sm:pr-0">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
