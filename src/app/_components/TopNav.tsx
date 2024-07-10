import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SearchBox from "../search/_components/SearchBox";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-blue-500 p-5 text-xl font-semibold">
      <div className="flex items-center justify-center gap-1">
        <SearchBox />
        {/* <SignedIn>My Shows</SignedIn> */}
      </div>

      <div className="flex gap-2">
        <img src="/mms-logo.jpg" width={32} alt="" />
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
