import axios from "axios";

export const likePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: "likeRequest" });
        const { data } = await axios.get(`/api/v1/post/${id}`);
        dispatch({ type: "likeSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "likeFailure", payload: error.response.data.message });
    }
};

export const addCommentOnPost = (id, comment) => async (dispatch) => {
    try {
        if (!id) {
            throw new Error('Post ID is not present');
        }
        dispatch({ type: "addCommentRequest" });
        const { data } = await axios.put(`/api/v1/post/comments/${id}`, { comment }, { headers: { "Content-Type": "application/json" } });
        dispatch({ type: "addCommentSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "addCommentFailure", payload: error.response.data.message });
    }
};

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
    try {
        if (!id) {
            throw new Error('Post ID is not present');
        }
        dispatch({ type: "deleteCommentRequest" });
        const { data } = await axios.delete(`/api/v1/post/comments/${id}`, { data: commentId });
        dispatch({ type: "deleteCommentSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "deleteCommentFailure", payload: error.response.data.message });
    }
};


export const createNewPost = (id, commentId) => async (dispatch) => {
    try {
        dispatch({ type: "newPostRequest" });
        const { data } = await axios.post(`/api/v1/post/upload`, { image, caption }, { headers: "application/json" });
        dispatch({ type: "newPostSuccess", payload: data.message });
    } catch (error) {
        dispatch({ type: "newPostFailure", payload: error.response.data.message });
    }
};