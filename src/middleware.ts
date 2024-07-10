import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(
  (auth, req) => {
    // Add your middleware checks
  },
  { debug: false },
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
