import { createReducer } from "@reduxjs/toolkit";
const initialState = { isAuthenticate: false }

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase('loginRequest', (state) => { state.loading = true; });
    builder.addCase('loginSuccess', (state, action) => { state.loading = false; state.user = action.payload; state.isAuthenticate = true; });
    builder.addCase('loginFailure', (state, action) => { state.loading = false; state.error = action.payload; state.isAuthenticate = false; });

    builder.addCase('registerRequest', (state) => { state.loading = true; });
    builder.addCase('registerSuccess', (state, action) => { state.loading = false; state.user = action.payload; state, isAuthenticate = true });
    builder.addCase('registerFailure', (state, action) => { state.loading = false; state.error = action.payload; state.isAuthenticate = false });

    builder.addCase('loadUserRequest', (state) => { state.loading = true; });
    builder.addCase('loadUserSuccess', (state, action) => { state.loading = false; state.user = action.payload; state.isAuthenticate = true; });
    builder.addCase('loadUserFailure', (state, action) => { state.loading = false; state.error = action.payload; state.isAuthenticate = false; });

    builder.addCase('logoutRequest', (state) => { state.loading = true; });
    builder.addCase('logoutSuccess', (state) => { state.loading = false; state.user = null; state.isAuthenticate = false; });
    builder.addCase('logoutFailure', (state, action) => { state.loading = false; state.error = action.payload; state.isAuthenticate = true; });
    builder.addCase('clearError', (state) => { state.error = null })
    builder.addCase('clearMessage', (state) => { state.message = null })
});


export const postOfFollowedUsersReducer = createReducer(initialState, (builder) => {
    builder.addCase('postOfFollowedUsersRequest', (state) => { state.loading = true; });
    builder.addCase('postOfFollowedUsersSuccess', (state, action) => { state.loading = false; state.posts = action.payload; });
    builder.addCase('postOfFollowedUsersFailure', (state, action) => { state.loading = false; state.error = action.payload; });
    builder.addCase('clearError', (state) => { state.error = null })
})


export const allUsersReducer = createReducer(initialState, (builder) => {
    builder.addCase('allUsersReducerRequest', (state) => { state.loading = true; });
    builder.addCase('allUsersReducerSuccess', (state, action) => { state.loading = false; state.users = action.payload; });
    builder.addCase('allUsersReducerFailure', (state, action) => { state.loading = false; state.error = action.payload; });
    builder.addCase('clearError', (state) => { state.error = null })
})

export const myPostReducer = createReducer(initialState, (builder) => {
    builder.addCase('myPostRequest', (state => { state.loading = true }))
    builder.addCase('myPostSuccess', (state, action) => { state.loading = false; state.message = action.payload; });
    builder.addCase('myPostFailure', (state, action) => { state.loading = false; state.error = action.payload; });
    builder.addCase('clearError', (state) => { state.error = null })
    builder.addCase('clearMessage', (state) => { state.message = null })

})
