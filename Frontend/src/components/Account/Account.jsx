import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { myPost } from "../../Actions/User"
import Loader from "../Loader/Loader"
import Post from "../Post/Post"
import toast, { Toaster } from "react-hot-toast"

const Account = () => {

  const dispatch = useDispatch()
  const { loading, posts } = useSelector((state) => state.myPost)
  const { error: likeError, message } = useSelector(state => state.Likes)
  const { error: addCommentError, message: addCommentMessage } = useSelector(state => state.addComments)
  const { error: deleteCommentError, message: deleteCommentMessage } = useSelector(state => state.deleteComments)


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


  useEffect(() => {
    dispatch(myPost)
  }, [dispatch])

  return loading ? <Loader /> : (
    <div className="border-2 border-red-500 flex justify-center items-center flex-col-reverse mt-16 sm:flex-row">
      <Toaster
        toastOptions={{
          success: { style: { color: '#3b82f6 ' } },
          error: { style: { color: '#3b82f6 ' } }
        }}
      />
      <div className="border-2 border-green-600 w-[70vw]">
        {
          posts && posts.length > 0 ? posts.map(post => (
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
          )) : <p>You don't have any post</p>
        }
      </div>
      <div className="border-2 border-green-600 w-[30vw]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo facilis reprehenderit nobis, aspernatur in neque similique iste, possimus non, illum perspiciatis molestias! Voluptas unde perferendis iusto incidunt libero voluptatum nulla?
      </div>
    </div>
  )


}

export default Account