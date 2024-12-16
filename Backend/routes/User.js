// API routes creation and using controller func's 
const express = require("express");
const { register, login, logout, updatePassword, updateProfile, deleteProfile, getAllUsers, getUserProfile } = require("../controller/User");
const { followUser } = require("../controller/User");
const { isAuthenticate } = require("../middlewares/auth")
const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/follow/:id").get(isAuthenticate, followUser)
router.route("/update/password").put(isAuthenticate, updatePassword)
router.route("/update/profile").put(isAuthenticate, updateProfile)
router.route("/delete/me").delete(isAuthenticate, deleteProfile)
router.route("/users").get(isAuthenticate, getAllUsers)
router.route("/user/:id").get(isAuthenticate, getUserProfile)
module.exports = router