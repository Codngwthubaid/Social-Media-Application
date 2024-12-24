import { configureStore } from '@reduxjs/toolkit'
import { allUsersReducer, postOfFollowedUsersReducer, userReducer } from './Reducers/UserReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowedUsers: postOfFollowedUsersReducer,
        allUsers : allUsersReducer
    }
})

export default store;
