// API routes creation and using controller func's 
const express = require("express");
const { createPost, likeAndUnlikePost, deletePost, getFollowedUserPost, updatePost, postComments, addOrrUpdatePostComments } = require("../controller/Post");
const { isAuthenticate } = require("../middlewares/auth");
const router = express.Router()

router
    .route("/post/upload")
    .post(isAuthenticate, createPost);

router
    .route("/post/:id")
    .put(isAuthenticate, updatePost)
    .get(isAuthenticate, likeAndUnlikePost)
    .delete(isAuthenticate, deletePost)

router
    .route("/posts")
    .get(isAuthenticate, getFollowedUserPost)

router
    .route("/post/comments/:id")
    .put(isAuthenticate, addOrrUpdatePostComments)



module.exports = router