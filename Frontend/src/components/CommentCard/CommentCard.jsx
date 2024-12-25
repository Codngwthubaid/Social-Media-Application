import React from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentOnPost } from '../../Actions/Post';
import { postOfFollowedUsers } from '../../Actions/User';

const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount

}) => {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)


    const handleDelete = () => {
        dispatch(deleteCommentOnPost(postId, commentId))
        if (isAccount) console.log("My Account");
        dispatch(postOfFollowedUsers())
    }

    return (
        <div>
            <Link to={`/user/${userId}`} className='flex justify-between items-center'>
                <div className='flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col'>
                        <img src={avatar} alt={name} />
                        <div>{name}</div>
                    </div>
                    <div>{comment}</div>
                </div>

                {isAccount ? <button onClick={handleDelete}><MdDelete /></button> : userId === user._id ? (<button onClick={handleDelete}><MdDelete /></button>) : null}
            </Link>
        </div>
    )
}

export default CommentCard