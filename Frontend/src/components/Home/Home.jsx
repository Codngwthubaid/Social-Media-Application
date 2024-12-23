import React from 'react'
import User from '../User/User'
import Post from '../Post/Post'
import img3 from '../../assets/Images/img3.png'

const Home = () => {
  return (
    <div>
      <div className='flex sm:mt-16 h-screen  w-[100vw] fixed bg-slate-100'>
        <div className='w-[75%] border rounded overflow-y-scroll mb-12'>
          <Post postImg={img3} ownerName={"Ubaid"} caption={"This the demo post"}/>
          <Post postImg={img3} ownerName={"Ubaid"} caption={"This the demo post"}/>
          <Post postImg={img3} ownerName={"Ubaid"} caption={"This the demo post"}/>
          <Post postImg={img3} ownerName={"Ubaid"} caption={"This the demo post"}/>
          <Post postImg={img3} ownerName={"Ubaid"} caption={"This the demo post"}/>
          <Post postImg={img3} ownerName={"Ubaid"} caption={"This the demo post"}/>
          <Post postImg={img3} ownerName={"Ubaid"} caption={"This the demo post"}/>
          <Post postImg={img3} ownerName={"Ubaid"} caption={"This the demo post"}/>
          <Post postImg={img3} ownerName={"Ubaid"} caption={"This the demo post"}/>
        </div>
        <div className='w-[25%] border rounded'>
          <User
            userId={"user._id"}
            name={"Ubaid"}
            avator={"user.avator.url"}
          />
        </div>
      </div>
    </div>
  )
}

export default Home