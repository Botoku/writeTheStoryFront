
import {getData} from '../helpers/getData'
import StoryListElement from '../components/StoryListElement'


const StoryList = async () => {

  const storyList = await getData(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/stories`)

  if(storyList.isLoading) return <div>Loading</div>

  return (
    <div>
      <h2 className="text-[2.5rem] text-orange-600 mb-4">Story List</h2>
      <div className="bg-darkGrey">
        {storyList?.map((story, i) => (
          <StoryListElement story={story} iterator={i}/>
        ))}
      </div>
    </div>
  );
};

export default StoryList;
