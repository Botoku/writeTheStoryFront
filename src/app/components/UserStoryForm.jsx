"use client";
import React, { useState } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import StoryAccordion from "./StoryAccordion.jsx";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { z } from "zod";

const UserStorySchema = z.object({
  storyBody: z
    .string()
    .trim()
    .min(40, { message: "Seems like a very short story" })
    .max(10000, {
      message: "Sorry can only have 10000 characters. ever though of a sequel",
    }),
  authorNotes: z
    .string()
    .trim()
    .max(500, { message: "Sorry can only have 500 characters." })
    .optional(),
  authorName: z.string().trim(),
  authorClerkId: z.string().trim(),
  story: z.string().trim(),
});
const UserStoryForm = ({ story }) => {
  const { userId } = useAuth();
  const params = useParams();
  const { user } = useUser();
  const handleStorySubmit = (e) => {
    e.preventDefault();
    const newStoryObj = {
      storyBody: userStory,
      authorNotes,
      authorName: user.firstName,
      authorClerkId: userId,
      story: params.id,
    };

    const result = UserStorySchema.safeParse(newStoryObj);

    if (!result.success) {
      // output error message
      setStoryError(true);
      return;
    }

    setStoryError(false);
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userStory`, result.data)
      .then(function (response) {
        // handle success
        setAuthorNotes("");
        setUserStory("");
        setStoryError(false);

        window.location.reload();
      })
      .catch(function (error) {
        // handle error
        setStoryError(true);
      });
  };
  const [userStory, setUserStory] = useState("");
  const [authorNotes, setAuthorNotes] = useState("");
  const [storyError, setStoryError] = useState(false);
  const firstAccordionBlock = (
    <div>
      <label
        htmlFor="story"
        className="block mb-2 text-sm font-medium text-gray-200 dark:text-white"
      >
        Write your story and make sure to include the story elements
      </label>
      <textarea
        id="story"
        rows="4"
        className="outline-none block p-2.5 mb-4 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your story here..."
        value={userStory}
        onChange={(e) => setUserStory(e.target.value)}
      ></textarea>
    </div>
  );

  const secondAccordionBlock = (
    <div className="mb-4">
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Authors Notes
          </label>
          <textarea
            id="comment"
            rows="4"
            className="outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            value={authorNotes}
            onChange={(e) => setAuthorNotes(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <p className="text-[.8rem] mb-3">
        Your story should include the following:
      </p>

      <div className="flex mb-3 flex-wrap gap-2">
        {story &&
          story?.storyElements?.map((el, i) => (
            <motion.p
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 2 }}
              key={i}
              className={`${
                userStory.toLowerCase().includes(el.toLowerCase())
                  ? "text-black bg-yellow-500"
                  : "text-gray-200 bg-gray-600"
              } w-max px-2 py-1 rounded-md`}
            >
              {el}
            </motion.p>
          ))}
      </div>
      <div className="my-3 py-2">
        <p className="mt-5">
          It should also have the following title:
          <span className=" text-lightGold"> {story?.title}</span>
        </p>
      </div>
      <form onSubmit={handleStorySubmit} className="pt-3">
        <StoryAccordion
          title={"Click here to write your own version..."}
          content={firstAccordionBlock}
        />
        <StoryAccordion
          title={"Click here to write some notes about the story"}
          content={secondAccordionBlock}
        />
        <div>
          {storyError && (
            <p className="text-red-400">
              Looks like theres something wrong with your story. Probably too
              long or too short
            </p>
          )}
        </div>
        <button
          type="submit"
          id="authorNotes"
          className="bg-orange-600 hover:bg-darkGold px-2 py-1 my-5 rounded-lg"
        >
          Submit your story
        </button>
      </form>
    </div>
  );
};

export default UserStoryForm;
