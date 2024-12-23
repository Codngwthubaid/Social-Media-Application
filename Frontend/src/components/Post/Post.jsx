import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx";
import { MdOutlineModeComment } from "react-icons/md";
import { MdModeComment } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";

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
    const [comment, setComment] = useState(false);

    const handleLikes = () => {
        setLike(!like)
    }
    const handleComments = () => {
        setComment(!comment)
    }


    return (
        <div className="max-w-md mx-auto text-black border border-gray-800 rounded-lg mb-6">
            <div className="flex items-center p-4">
                <div className="h-8 w-8 rounded-full border-2 border-blue-500 overflow-hidden">
                    <img
                        src="/placeholder.svg"
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="ml-4 flex-1">
                    <Link to={`/user/${ownerId}`}>
                        <span className="font-semibold text-lg">{ownerName}</span>
                    </Link>
                </div>
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
                        <button onClick={(handleComments)}>
                            {comment ? <MdModeComment className="text-blue-500 w-6 h-6" /> : <MdOutlineModeComment className='w-6 h-6' />}
                        </button>
                    </div>
                    <div className="space-y-2">
                        <p className="font-semibold text-base">{5} likes</p>

                    </div>
                </div>

                <p className="text-base">
                    <span className="font-semibold">{ownerName}</span>{' '}
                    {caption}{' '}
                </p>
            </div>
        </div>
    )
}

export default Post