import { configureStore } from '@reduxjs/toolkit'
import { allUsersReducer, postOfFollowedUsersReducer, userReducer } from './Reducers/UserReducer';
import { likeReducer } from './Reducers/PostReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowedUsers: postOfFollowedUsersReducer,
        allUsers : allUsersReducer,
        Likes : likeReducer
    }
})

export default store;
