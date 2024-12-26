import React, { useState } from 'react'


const Create = () => {
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    const Reader = new FileReader()
    Reader.readAsDataURL(file)

    Reader.onload = () => { if (Reader.readyState == 2) setImage(Reader.result); }

  }

  const submitHandler = () => {
    
  }
  

  return (
    <div>
      <form>
        <div>New Post</div>
        {image && <img src={image} alt='Post' />}
        <input type="file" accept='image/*' onChange={handleImageChange} />
        <input type="text" placeholder='Caption ...' value={caption} onChange={(e) => { setCaption(e.target.value) }} />
        <button type='submit'>Post</button>
      </form>
    </div>
  )
}

export default Create