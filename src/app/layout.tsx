import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import { TopNav } from "./_components/TopNav";
import { Toaster } from "sonner";
import { SearchProvider } from "./search/search-context";

export const metadata = {
  title: "Media Meta Search",
  description: "Your media search engine.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SearchProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body className="dark">
            <div className="grid h-screen grid-rows-[auto,1fr]">
              <TopNav />
              <main className="overflow-y-scroll">{children}</main>
            </div>
            <div id="modal-root" />
            <Toaster />
            <h6 className="text-center text-xs">&copy; 2024 Paul Mason</h6>
          </body>
        </html>
      </SearchProvider>
    </ClerkProvider>
  );
}
