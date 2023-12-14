import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";
import { ReactQueryProvider } from "./components/ReactQueryProvider";
import Menu from "./components/UI Elements/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Write The Story",
  description:
    "A website where you challenge your creativity and write stories based on prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full relative">
        <ClerkProvider>
          <ReactQueryProvider>
            <main className="mx-auto ">
              <Header />
             
              <div className="flex bg-darkGrey  items-center justify-center min-h-screen">
                <div className="pt-5">{children}</div>
              </div>
            </main>
          </ReactQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
