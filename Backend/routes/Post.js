// API routes creation and using controller func's 
const express = require("express");
const { createPost } = require("../controller/Post");
const { isAuthenticate } = require("../middlewares/auth");
const router = express.Router()

router.route("/post/upload").post(isAuthenticate, createPost);

module.exports = router