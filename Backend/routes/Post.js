// API routes creation and using controller func's 
const express = require("express");
const { createPost, likeAndUnlikePost, deletePost, getFollowedUserPost } = require("../controller/Post");
const { isAuthenticate } = require("../middlewares/auth");
const router = express.Router()

router
    .route("/post/upload")
    .post(isAuthenticate, createPost);
router
    .route("/post/:id")
    .get(isAuthenticate, likeAndUnlikePost)
    .delete(isAuthenticate, deletePost)

router
    .route("/post")
    .get(isAuthenticate, getFollowedUserPost)

module.exports = router