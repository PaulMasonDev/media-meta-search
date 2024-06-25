import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import SimpleUploadButton from "./SimpleUploadButton";
import SearchBox from "./SearchBox";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>
        <span>Media Meta Search</span>
      </div>
      <SearchBox />
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
