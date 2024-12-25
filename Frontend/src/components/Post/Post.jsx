import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineModeComment } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { addCommentOnPost, likePost } from '../../Actions/Post';
import { postOfFollowedUsers } from '../../Actions/User';
import { MdDelete } from "react-icons/md";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { IoMdClose } from "react-icons/io";
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';

const Post = ({
    postId,
    caption,
    postImg,
    ownerId,
    ownerName,
    ownerImg,
    likes = [],
    comments = [],
    isDelete = false,
    isAccount = false
}) => {

    const [like, setLike] = useState(false);
    const [likeUser, setLikeUser] = useState(false)
    const [commentValueByUser, setCommentValueByUser] = useState("")
    const [commentValueByUserToggle, setCommentValueByUserToggle] = useState(false)


    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)


    const handleLikes = async () => {
        setLike(!like)
        await dispatch(likePost(postId))
        if (isAccount) console.log("Bring my posts ...");
        dispatch(postOfFollowedUsers())
    }

    const handleComments = async (e) => {
        e.preventDefault()
        if (!postId) console.log("Post ID is not present")
        await dispatch(addCommentOnPost(postId, commentValueByUser))
        setCommentValueByUser("")
        if (isAccount) console.log("This is my profile ...");
        dispatch(addCommentOnPost())

    }

    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === user._id) setLike(true)
        })
    }, [likes, user._id])



    return (
        <div className="max-w-md mx-auto text-black border border-gray-800 rounded-lg mb-6">
            <div className="flex items-center p-4">
                <div>
                    <img src={ownerImg} className="h-8 w-8 rounded-2xl object-cover border-2 border-blue-500" alt="User_Img" />
                </div>
                <div className="ml-2 flex-1">
                    <Link to={`/user/${ownerId}`}>
                        <span className="font-semibold text-lg">{ownerName}</span>
                    </Link>
                </div>
                {isDelete && <MdDelete className='hover:cursor-pointer w-5 h-5' />}
            </div>

            <div>
                <img className='border border-green-800 h-96 w-full object-cover' src={postImg} alt={`${ownerName} Post`} />
            </div>

            <div className="p-4">
                <div className="flex justify-between mb-4">
                    <div className="flex space-x-4">
                        <button onClick={(handleLikes)}>
                            {like ? <AiFillLike className="text-blue-500 w-6 h-6" /> : <AiOutlineLike className='w-6 h-6' />}
                        </button>
                        <button onClick={() => { setCommentValueByUserToggle(!commentValueByUserToggle) }}>
                            <MdOutlineModeComment className='w-6 h-6' />
                        </button>
                    </div>
                    <div className="space-y-2">
                        <button className="font-medium text-base" onClick={() => setLikeUser(!likeUser)} disabled={likes.length === 0 ? true : false}>{likes.length} likes</button>
                    </div>
                </div>

                <div className="text-base">
                    <span className="font-semibold">{ownerName}</span>{' '}
                    {caption}{' '}
                </div>

                <Dialog open={likeUser} onClose={() => { setLikeUser(!likeUser) }} >
                    <DialogTitle className='h-[80vh] sm:w-[30vw] w-[70vw]'>
                        <div className='flex items-center justify-between'>
                            <div>Post Liked </div>
                            <button onClick={() => { setLikeUser(!likeUser) }}><IoMdClose /></button>
                        </div>
                        <div>
                            {likes.map((like) => (
                                <User
                                    key={like._id}
                                    userId={like._id}
                                    name={like.name}
                                    avator={like.avator}
                                />
                            ))}
                        </div>
                    </DialogTitle>
                </Dialog>


                <Dialog open={commentValueByUserToggle} onClose={() => { setCommentValueByUserToggle(!commentValueByUserToggle) }} >
                    <DialogTitle className='h-[80vh] sm:w-[50vw] sm:[30vw] w-[70vw]'>
                        <div className='flex items-center justify-between'>
                            <div>Add Comments </div>
                            <button onClick={() => { setCommentValueByUserToggle(!commentValueByUserToggle) }}><IoMdClose /></button>
                        </div>
                        <div className='flex items-center justify-between my-5'>
                            <form>
                                <input
                                    required
                                    type="text"
                                    placeholder='Comment here ...'
                                    className='border border-gray-800 rounded-lg p-2 w-full'
                                    value={commentValueByUser}
                                    onChange={(e) => setCommentValueByUser(e.target.value)}
                                />
                            </form>

                            <button onClick={handleComments} className='bg-blue-500 hover:bg-blue-600  p-2 rounded-lg text-white'>Add</button>
                        </div>
                        {comments.length > 0 ? (comments.map((comment) =>
                        (<CommentCard
                            key={comment._id}
                            userId={comment.user._id}
                            name={comment.user.name}
                            avatar={comment.user.avatar.url}
                            comment={comment.comment}
                            commentId={comment._id}
                            postId={postId}
                            isAccount={isAccount}
                        />))) : (<div>No comments yet.</div>)}
                    </DialogTitle>
                </Dialog>
            </div>
        </div>
    )
}

export default Post