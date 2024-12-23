import { configureStore } from '@reduxjs/toolkit'
import { postOfFollowedUsersReducer, userReducer } from './Reducers/UserReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowedUsers: postOfFollowedUsersReducer,
    }
})

export default store;
