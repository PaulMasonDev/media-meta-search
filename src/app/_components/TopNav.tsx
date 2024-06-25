import SearchBox from "./SearchBox";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-blue-500 p-4 text-xl font-semibold">
      <SearchBox />
      <span>MMS</span>
      {/* <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div> */}
    </nav>
  );
}
