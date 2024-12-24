import { configureStore } from '@reduxjs/toolkit'
import { allUsersReducer, postOfFollowedUsersReducer, userReducer } from './Reducers/UserReducer';
import { CommentReducer, likeReducer } from './Reducers/PostReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowedUsers: postOfFollowedUsersReducer,
        allUsers : allUsersReducer,
        Likes : likeReducer,
        Comments : CommentReducer
    }
})

export default store;
