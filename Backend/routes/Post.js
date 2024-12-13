// API routes creation and using controller func's 
const express = require("express");
const { createPost } = require("../controller/Post");
const router = express.Router()

router.route("/post/upload").post(createPost);

module.exports = router