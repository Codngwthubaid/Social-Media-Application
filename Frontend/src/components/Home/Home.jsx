import React from 'react'
import User from '../User/User'


const Home = () => {
  return (
    <div>
      <div className='flex sm:mt-16 h-screen w-[100vw] fixed bg-slate-100'>
        <div className='w-[80%] border rounded overflow-y-scroll'>
          <User
            userId={"user._id"}
            name={"user.name"}
            avator={"user.avator.url"}
          />
        </div>
        <div className='w-[20%] border rounded'>bye</div>
      </div>
    </div>
  )
}

export default Home