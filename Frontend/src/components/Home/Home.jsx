import React, { useEffect } from 'react'
import User from '../User/User'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, postOfFollowedUsers } from '../../Actions/User'
import Loader from '../Loader/Loader'
import { toast, Toaster } from 'react-hot-toast'


const Home = () => {

  const { error: likeError, message } = useSelector(state => state.Likes)
  const { error: addCommentError, message: addCommentMessage } = useSelector(state => state.addComments)
  const { error: deleteCommentError, message: deleteCommentMessage } = useSelector(state => state.deleteComments)
  const { loading, posts, error } = useSelector(state => state.postOfFollowedUsers)
  const { users, loading: userLoading } = useSelector(state => state.allUsers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(postOfFollowedUsers())
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    if (likeError) toast.error(likeError); dispatch({ type: 'clearError' })
    if (message) toast.success(message); dispatch({ type: 'clearMessage' })
  }, [toast, likeError, message])

  useEffect(() => {
    if (addCommentError) toast.error(addCommentError); dispatch({ type: 'clearError' })
    if (addCommentMessage) toast.success(addCommentMessage); dispatch({ type: 'clearMessage' })
  }, [toast, addCommentError, addCommentMessage])

  useEffect(() => {
    if (deleteCommentError) toast.error(deleteCommentError); dispatch({ type: 'clearError' })
    if (deleteCommentMessage) toast.success(deleteCommentMessage); dispatch({ type: 'clearMessage' })
  }, [toast, deleteCommentError, addCommentMessage])


  return loading === true || userLoading === true ? <Loader /> :
    <div className='flex sm:mt-16 h-[90vh] w-[100vw] fixed bg-slate-100'>
      <Toaster
        toastOptions={{
          success: { style: { color: '#3b82f6 ' } },
          error: { style: { color: '#3b82f6 ' } }
        }}
      />
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
      <div className='hidden sm:block sm:w-[25%] border rounded'>
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