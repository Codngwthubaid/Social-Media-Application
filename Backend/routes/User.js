// API routes creation and using controller func's 
const express = require("express");
const { register } = require("../controller/User");
const router = express.Router()


router.route("/register").post(register)

module.exports = router