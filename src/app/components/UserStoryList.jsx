'use client'
import React from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

const UserStoryList = () => {
  const [userStories, setUserStories] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/userStory/${id}`)
      .then(function (response) {
        // handle success

        setUserStories(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="mb-4">
      {userStories.length > 0 &&
        userStories?.map((story) => (
          <div key={`${story._id}${story.authorName}`} className="border-b pb-3 mb-4">
            <p>
              Author:
              <span> {story.authorName}</span>
            </p>
            <p>Story: {story.storyBody}</p>
            <p>Notes: {story.authorNotes}</p>
          </div>
        ))}

      {userStories.length < 0 && (
        <p className="text-red-200">
          No author has written on this. Be the first author to write a story
          with this theme
        </p>
      )}
    </div>
  );
};

export default UserStoryList;
