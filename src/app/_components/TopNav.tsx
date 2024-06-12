import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function TopNav() {
  // tailwind classname for height of 40px

  return (
    <nav className="flex w-full items-center justify-between border-b p-5 text-xl font-semibold">
      <div>Media Meta Search</div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
