import React from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';

const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount

}) => {

    const { user } = useSelector((state) => state.user)
    const handleDelete = () => {
        
    }

    return (
        <div>
            <Link to={`/user/${userId}`}>
                <img src={avatar} alt={name} />
                <div>{name}</div>
                <div>{comment}</div>

                {isAccount ? <button onClick={handleDelete}><MdDelete /></button> : userId === user._id ? (<button onClick={handleDelete}><MdDelete /></button>) : null}
            </Link>
        </div>
    )
}

export default CommentCard