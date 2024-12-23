import React, { useEffect } from 'react'
import User from '../User/User'
import Post from '../Post/Post'
import img3 from '../../assets/Images/img3.png'
import { useDispatch, useSelector } from 'react-redux'
import { postOfFollowedUsers } from '../../Actions/User'
import Loader from '../Loader/Loader'


const Home = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(postOfFollowedUsers())
  }, [])

  const { loading, posts, error } = useSelector(state => state.postOfFollowedUsers)


  return loading ? <Loader /> :
    <div className='flex sm:mt-16 h-[90vh] w-[100vw] fixed bg-slate-100'>
      <div className='w-full sm:w-[75%] border rounded overflow-y-scroll h-[90vh] mb-12 hide-scrollbar'>
        {posts && posts.length > 0 ? posts.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            caption={post.caption}
            postImg={post.image.url}
            ownerId={post.owner._id}
            ownerName={post.owner.name}
            ownerImg={post.owner.avatar.url}
            likes={post.likes}
            comments={post.comments}
          />
        )) : "No post "
        }

      </div>
      <div className='hidden sm:w-[25%] border rounded'>
        <User
          userId={"user._id"}
          name={"Ubaid"}
          avator={"user.avator.url"}
        />
      </div>
    </div>

}
export default Home