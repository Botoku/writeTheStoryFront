import Image from "next/image";
import StoryList from "./components/StoryList";
import Link from "next/link";
import { auth, UserButton, currentUser } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();

  return (
    <div className="text-gray-200 px-3">
      <p className="mb-6">
        Pick a theme and write a story. Flex your writing skills and train your
        brain on random topics.
      </p>
      <>
        <StoryList />
      </>
      {userId === process.env.NEXT_PUBLIC_BACKEND_URL && (
        <div className="mt-5 bg-lightGold w-max px-3 py-2 rounded-lg">
          <Link href="/createStory">Create Story Theme</Link>
        </div>
      )}

      <footer>
        <p>Thats All Folks</p>
        <p>
          This website is based on the creative book Write The Story which can
          be bought{" "}
          <Link
            className="text-darkGold"
            href="https://www.amazon.com/Piccadilly-Creative-Storytelling-Notebook-Acid-Free/dp/1608637689"
          >
            here
          </Link>
          . I do encourange you to buy it as I have only covered here 20 percent
          of the stories.{" "}
        </p>{" "}
      </footer>
    </div>
  );
}
