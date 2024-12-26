import { configureStore } from '@reduxjs/toolkit'
import { allUsersReducer, postOfFollowedUsersReducer, userReducer, myPostReducer } from './Reducers/UserReducer';
import { addCommentReducer, deleteCommentReducer, likeReducer, newPostReducer } from './Reducers/PostReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowedUsers: postOfFollowedUsersReducer,
        allUsers: allUsersReducer,
        Likes: likeReducer,
        addComments: addCommentReducer,
        deleteComments: deleteCommentReducer,
        myPost: myPostReducer,
        createNewPost: newPostReducer
    }
})

export default store;

