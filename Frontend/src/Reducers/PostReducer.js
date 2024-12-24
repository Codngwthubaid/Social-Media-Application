import { createReducer } from "@reduxjs/toolkit";
const initialState = {}

export const likeReducer = createReducer(initialState, (builder) => {
    builder.addCase('likeRequest', (state) => { state.loading = true; });
    builder.addCase('likeSuccess', (state, action) => { state.loading = false; state.message = action.payload; });
    builder.addCase('likeFailure', (state, action) => { state.loading = false; state.error = action.payload; });
    builder.addCase('clearError', (state) => { state.error = null })
    builder.addCase('clearMessage', (state) => { state.message = null })
})

export const CommentReducer = createReducer(initialState, (builder) => {
    builder.addCase('addCommentRequest', (state) => { state.loading = true; });
    builder.addCase('addCommentSuccess', (state, action) => { state.loading = false; state.message = action.payload; });
    builder.addCase('addCommentFailure', (state, action) => { state.loading = false; state.error = action.payload; });
    builder.addCase('clearError', (state) => { state.error = null })
    builder.addCase('clearMessage', (state) => { state.message = null })
})