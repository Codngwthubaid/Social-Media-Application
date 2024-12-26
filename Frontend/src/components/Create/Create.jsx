import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createNewPost } from "../../Actions/Post"
import { toast, Toaster } from 'react-hot-toast'



const Create = () => {
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState("")
  const dispatch = useDispatch()
  const { loading, error, message } = useSelector((state) => state.createNewPost)

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    const Reader = new FileReader()
    Reader.readAsDataURL(file)

    Reader.onload = () => { if (Reader.readyState == 2) setImage(Reader.result); }

  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createNewPost(image, caption))
  }

  useEffect(() => {
    if (error) toast.error(error); dispatch({ type: "clearError" })
    if (message) toast.success(message); dispatch({ type: "clearMessage" })
  }, [dispatch, error, message, toast])



  return (
    <div>
      <Toaster
        toastOptions={{
          success: { style: { color: '#3b82f6 ' } },
          error: { style: { color: '#3b82f6 ' } }
        }}
      />
      <form>
        <div>New Post</div>
        {image && <img src={image} alt='Post' />}
        <input type="file" accept='image/*' onChange={handleImageChange} />
        <input type="text" placeholder='Caption ...' value={caption} onChange={(e) => { setCaption(e.target.value) }} />
        <button type='submit' disabled={loading} onClick={submitHandler}>Post</button>
      </form>
    </div>
  )
}

export default Create