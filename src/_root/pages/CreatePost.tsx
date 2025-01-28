import PostForm from '@/components/forms/PostForm'
import React from 'react'

const CreatePost: React.FC = () => {
  return (
    <div className='sm:ml-[30vw] lg:ml-[25vw] h-[85vh] sm:h-screen w-full sm:w-[70vw] lg:w-[75vw] overflow-y-scroll no-scrollbar'>
      <div>
        <div className='flex gap-x-1 justify-start m-4 items-center'>
          <img
            width={32}
            height={32}
            src="/assets/icons/add-post.svg"
            alt="Add" />
          <h2 className='text-2xl font-bold'>Create Post</h2>
        </div>

        <PostForm />
      </div>
    </div>
  )
}

export default CreatePost
