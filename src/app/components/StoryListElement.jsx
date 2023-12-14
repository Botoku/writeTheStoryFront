'use client'
import { motion } from "framer-motion";
import Link from "next/link";


const StoryListElement = ({story, iterator}) => {
  return (
    <motion.div
            initial={{ opacity: 0, x: -300 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{delay: .3, duration: 1}}
            viewport={{ once: true }}

          
            key={story._id}
            className="mb-8 py-3 px-2"
          >
            <div className="flex items-center justify-between text-[2rem] text-darkGold pr-6">
              <p className="text-lightGold text-[1.7rem] ">{story.title}</p>
              <p>#{iterator + 1}</p>
            </div>

            <p className="mb-2">Include the following in your story:</p>
            <div className="flex flex-wrap">
              {story.storyElements.map((el, i) => (
                <p
                  key={iterator}
                  className="mr-2 mb-3 bg-lightGold px-2 py-1 rounded-xl text-darkGrey"
                >
                  {el}
                </p>
              ))}
            </div>
            <p className="text-blue-300">Heres what chat-gpt came up with</p>
            <p className="line-clamp-6 mb-6">{story.aiStory}</p>

            <Link
              href={`/story/${story._id}`}
              className="mt-8 rounded-lg bg-orange-600 px-3 py-2 text-white"
            >
              View Story
            </Link>

            <div className="border-2 mt-7" />
          </motion.div>
  )
}

export default StoryListElement