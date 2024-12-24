import React, { useEffect } from 'react'
import User from '../User/User'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, postOfFollowedUsers } from '../../Actions/User'
import Loader from '../Loader/Loader'


const Home = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(postOfFollowedUsers())
    dispatch(getAllUsers())
  }, [dispatch])

  const { loading, posts, error } = useSelector(state => state.postOfFollowedUsers)
  const { users, loading: userLoading } = useSelector(state => state.allUsers)

  return loading === true || userLoading === true ? <Loader /> :
    <div className='flex sm:mt-16 h-[90vh] w-[100vw] fixed bg-slate-100'>
      <div className='w-full sm:w-[75%] border rounded overflow-y-scroll h-[90vh] mb-12 hide-scrollbar'>
        {posts && posts.length > 0 ? posts.map((post) => (
          <Post
            key={post._id}
            postId={post._id}
            caption={post.caption}
            postImg={post.image}
            ownerId={post.owner._id}
            ownerName={post.owner.name}
            ownerImg={post.owner.avator}
            likes={post.likes}
            comments={post.comments}
          />
        )) : "No post yet"
        }

      </div>
      <div className='sm:w-[25%] border rounded'>
        {users && users.length > 0 ? users.map((user) => (
          <User
            key={user._id}
            userId={user._id}
            name={user.name}
            avator={user.avator}
          />
        )) : "No user yet"
        }
      </div>
    </div>

}
export default Home