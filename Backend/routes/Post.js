const express = require("express");
const { isAuthenticate } = require("../middlewares/auth");
const {
    createPost,
    likeAndUnlikePost,
    deletePost,
    updatePost,
    getFollowedUserPost,
} = require("../controller/Post");


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

module.exports = router