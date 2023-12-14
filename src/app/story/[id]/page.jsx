"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import UserStoryForm from "../../components/UserStoryForm";
import UserStoryList from "../../components/UserStoryList";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Home } from "react-feather";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {retrieveStory} from '../../helpers/getData'
export default function Page({ params }) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();
  const [viewAiStory, setViewAiStory] = useState(false);
  const handleViewAiStory = (e) => {
    e.preventDefault();
    setViewAiStory(!viewAiStory);
  };

  const {data:story, error, isLoading} = useQuery({queryKey: ["individualStory", params.id],queryFn:() => retrieveStory(params.id)})



  if(isLoading) return <div>Loading</div>
  if(error){
    return <div>Error loading data</div>
  } 

  
  return (
    <main className="text-gray-200 px-2  lg:px-4 md:px-6 max-w-[1600px] mx-auto"> 
      {!userId && (
        <div className="overflow-hidden">
          <motion.p
            animate={{ x: [0, 100, 80, 120, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 5, duration: 2 }}
            className="text-gray-300 mb-4 py-3"
          >
            Login to write your own version of this story
            <Link
              className="ml-3 bg-darkGold px-3 py-1 rounded-xl"
              href="/sign-in"
            >
              Login
            </Link>
          </motion.p>
        </div>
      )}
      {isLoaded && isSignedIn && userId && (
        <div>
          <p className="text-lg mb-4">
            Create your own story{" "}
            <span className="text-lightGold">{user.firstName}</span> using the
            story elements
          </p>

          <UserStoryForm story={story} />
        </div>
      )}

      <div>
        <p className="text-[1.2rem] mb-1 text-yellow-400">
          Heres what other authors came up with
        </p>
        <UserStoryList />
      </div>
      <p className="text-yellow-400 text-[1.2rem]">
        Heres what chat-gpt came up with{" "}
      </p>
      <p className={`${!viewAiStory ? "line-clamp-3" : "line-clamp-none"}`}>
        {story && story?.aiStory}
      </p>
      <button onClick={handleViewAiStory}>
        {!viewAiStory ? (
          <p className="bg-darkGold text-black mt-4 px-2 py-1 rounded-2xl">
            View All
          </p>
        ) : (
          <p className="bg-black text-darkGold mt-4 px-2 py-1 rounded-2xl">
            View Less
          </p>
        )}
      </button>

      <div className="hover:text-darkGold mt-4 px-2 py-1 rounded-2xl">
        <Link className="flex gap-2" href={"/"}>
          Go Home <Home />
        </Link>
      </div>
    </main>
  );
}
