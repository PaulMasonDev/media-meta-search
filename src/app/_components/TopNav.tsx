import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SearchBox from "../search/_components/SearchBox";
import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-blue-500 p-5 text-xl font-semibold">
      <div className="flex items-center justify-center gap-1">
        <SearchBox />
        {/* <SignedIn>My Shows</SignedIn> */}
      </div>

      <div className="flex items-center gap-2">
        <Link className="ml-2 w-8" href="/">
          <img src="/mms-logo.jpg" alt="" />
        </Link>
        <div className="flex flex-row items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
