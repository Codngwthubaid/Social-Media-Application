const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const {
    createPost,
    likeAndUnlikePost,
    deletePost,
    updatePost,
    getFollowedUserPost,
    addOrrUpdatePostComments,
    deletePostComment,
} = require("../controller/Post");


const router = express.Router()
router
    .route("/post/upload")
    .post(isAuthenticate, createPost);

router
    .route("/post/:id")
    .get(isAuthenticate, likeAndUnlikePost)
    .put(isAuthenticate, updatePost)
    .delete(isAuthenticate, deletePost)

router
    .route("/posts")
    .get(isAuthenticate, getFollowedUserPost)

router
    .route("/post/comments/:id")
    .put(isAuthenticate, addOrrUpdatePostComments)
    .delete(isAuthenticate, deletePostComment)


module.exports = router