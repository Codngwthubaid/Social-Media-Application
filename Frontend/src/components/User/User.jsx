import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ userId, name, avatar }) => {
    return (
        <div>
            <Link to={`/user/${userId}`}>
                <div className='flex items-center p-4 border-b'>
                    <img
                        className='h-12 w-12 rounded-full object-cover'
                        src={avatar}
                        alt={name}
                    />
                    <p className='ml-4'>{name}</p>
                </div>
            </Link>
        </div>
    )
}

export default User