import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import { TopNav } from "./_components/TopNav";
import { ShowsProvider } from "./search/shows-context";
import Footer from "./_components/Footer";

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
      <ShowsProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body className="dark">
            <div className="grid h-screen grid-rows-[auto,1fr]">
              <TopNav />
              <main className="overflow-y-scroll">{children}</main>
            </div>
            <div id="modal-root" />
            <Footer />
          </body>
        </html>
      </ShowsProvider>
    </ClerkProvider>
  );
}
