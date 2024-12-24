import { configureStore } from '@reduxjs/toolkit'
import { allUsersReducer, postOfFollowedUsersReducer, userReducer } from './Reducers/UserReducer';
import { addCommentReducer, deleteCommentReducer, likeReducer } from './Reducers/PostReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowedUsers: postOfFollowedUsersReducer,
        allUsers: allUsersReducer,
        Likes: likeReducer,
        addComments: addCommentReducer,
        deleteComments : deleteCommentReducer
    }
})

export default store;
