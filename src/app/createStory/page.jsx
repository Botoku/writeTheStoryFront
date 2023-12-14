import React from 'react'
import StoryThemeUploadForm from '../components/StoryThemeUploadForm'

const createStory = () => {
  return (
    <section className='text-gray-200'>
    <h1 className='mb-3 text-3xl'>Create Story Theme</h1>
    <p>Authorized moderators can create story themes on this page</p>
    <div>
        <StoryThemeUploadForm />
    </div>
    </section>
  )
}

export default createStory