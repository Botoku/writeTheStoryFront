"use client";
import React, { useState } from "react";
import axios from "axios";

const StoryThemeUploadForm = () => {
  const [storyTitle, setStoryTitle] = useState("");
  const [storyElements, setStoryElements] = useState([]);
  const [aiStory, setAiStory] = useState("");

  const handleStoryElements = (e) => {
    setStoryElements(e.target.value);
  };
  const handleSubmit = () => {
    const finalStoryElement = storyElements.split(", ");
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stories`, {
        title: storyTitle,
        storyElements: finalStoryElement,
        aiStory,
      })
      .then(function (response) {
        // handle success
        setStoryElements("");
        setStoryTitle("");
        setAiStory("");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        <div className="mb-3 mt-4 text-black">
          <input
            className="px-3 py-2 rounded-2xl"
            type="text"
            placeholder="story title"
            value={storyTitle}
            onChange={(e) => setStoryTitle(e.target.value)}
          />
        </div>
        <div className="mb-3 mt-4 text-black">
          <textarea
            className="px-3 py-2 rounded-2xl"
            type="text"
            placeholder="AI Story"
            value={aiStory}
            onChange={(e) => setAiStory(e.target.value)}
          />
        </div>
        <div className="mb-6 mt-4 text-black">
          <input
            className="px-3 py-2 rounded-2xl"
            type="text"
            placeholder="story Elements"
            value={storyElements}
            onChange={handleStoryElements}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="hover:bg-orange-600 text-white rounded-lg px-5 py-3 cursor-pointer bg-orange-400"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StoryThemeUploadForm;
