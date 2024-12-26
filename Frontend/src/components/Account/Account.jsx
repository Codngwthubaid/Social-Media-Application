import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser, myPost } from "../../Actions/User"
import Loader from "../Loader/Loader"
import Post from "../Post/Post"
import toast, { Toaster } from "react-hot-toast"
import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import { Dialog, DialogTitle } from "@mui/material"
import User from "../User/User"
import { IoMdClose } from "react-icons/io"



const Account = () => {

  const dispatch = useDispatch()
  const { loading, posts } = useSelector((state) => state.myPost)
  const { loading: userLoading, user } = useSelector((state) => state.user)
  const { error: likeError, message } = useSelector((state) => state.Likes)
  const { error: addCommentError, message: addCommentMessage } = useSelector((state) => state.addComments)
  const { error: deleteCommentError, message: deleteCommentMessage } = useSelector((state) => state.deleteComments)

  const [followers, setFollowers] = useState("")
  const [following, setFollowing] = useState("")

  useEffect(() => {
    if (likeError) toast.error(likeError); dispatch({ type: 'clearError' })
    if (message) toast.success(message); dispatch({ type: 'clearMessage' })
  }, [toast, likeError, message, dispatch])

  useEffect(() => {
    if (addCommentError) toast.error(addCommentError); dispatch({ type: 'clearError' })
    if (addCommentMessage) toast.success(addCommentMessage); dispatch({ type: 'clearMessage' })
  }, [toast, addCommentError, addCommentMessage, dispatch])

  useEffect(() => {
    if (deleteCommentError) toast.error(deleteCommentError); dispatch({ type: 'clearError' })
    if (deleteCommentMessage) toast.success(deleteCommentMessage); dispatch({ type: 'clearMessage' })
  }, [toast, deleteCommentError, addCommentMessage, dispatch])


  const logoutHandler = () => {
    dispatch(logoutUser())

  }

  useEffect(() => {
    dispatch(myPost())
  }, [dispatch])



  return loading === true || userLoading === true ? <Loader /> : (
    <div className="border-2 border-red-500 flex justify-center items-center flex-col-reverse sm:mt-16 sm:flex-row">
      <Toaster
        toastOptions={{
          success: { style: { color: '#3b82f6 ' } },
          error: { style: { color: '#3b82f6 ' } }
        }}
      />
      <div className="border-2 border-green-600 sm:w-[70vw] w-full">
        {
          posts && posts.length > 0 ? posts.map(post => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImg={post.image}
              ownerId={post.owner._id}
              ownerName={post.owner.name}
              ownerImg={post.owner.avatar.url}
              likes={post.likes}
              comments={post.comments}
              isDelete={true}
              isAccount={true}
            />
          )) : <p>You don't have any post</p>
        }
      </div>
      <div className="border-2 border-green-600 w-full sm:w-[30vw]">
        <div className="flex flex-col justify-center items-center">
          <Avatar
            className='h-12 w-12 rounded-full object-cover'
            src={user.avatar.url}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>

        <button onClick={() => { setFollowers(!followers) }}>Followers</button>
        <div>{user.followers.length}</div>

        <button onClick={() => { setFollowing(!following) }}>Followings</button>
        <div>{user.followering.length}</div>

        <button>Posts</button>
        <div>{user.posts.length}</div>


        <div><button><Link to="/update/password">Update Password</Link></button></div>
        <div><button><Link to="/update/profile">Update Profle</Link></button></div>
        <div><button><Link to="/logout" onClick={logoutHandler}>Logout</Link></button></div>


        <Dialog open={followers} onClose={() => { setFollowers(!followers) }} >
          <DialogTitle className='h-[80vh] sm:w-[30vw] w-[70vw]'>
            <div className='flex items-center justify-between'>
              <div>Followers </div>
              <button onClick={() => { setFollowers(!followers) }}><IoMdClose /></button>
            </div>
            <div>
              {user && user.followers.length > 0 ? (
                user.followers.map((follower) => (
                  <User
                    key={follower._id}
                    userId={follower._id}
                    name={follower.name}
                    avatar={follower.avatar}
                  />
                ))) : (<p>You have no followers</p>)
              }
            </div>
          </DialogTitle>
        </Dialog>

        <Dialog open={following} onClose={() => { setFollowing(!following) }} >
          <DialogTitle className='h-[80vh] sm:w-[30vw] w-[70vw]'>
            <div className='flex items-center justify-between'>
              <div>Followers </div>
              <button onClick={() => { setFollowing(!following) }}><IoMdClose /></button>
            </div>
            <div>
              {user && user.followering.length > 0 ? (
                user.followering.map((following) => (
                  <User
                    key={following._id}
                    userId={following._id}
                    name={following.name}
                    avator={following.avator}
                  />
                ))) : (<p>You have no followers</p>)
              }
            </div>
          </DialogTitle>
        </Dialog>

      </div>
    </div>
  )


}

export default Account