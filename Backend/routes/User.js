const express = require("express");
const { isAuthenticate } = require("../middlewares/auth")
const {
    register,
    login,
    logout,
    updatePassword,
    updateProfile,
    deleteProfile,
    getAllUsers,
    getUserProfile,
    followUser,
    getProfile,
    forgetPassword,
    resetPassword,
    getMyPosts,
} = require("../controller/User");

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
router.route("/me").get(isAuthenticate, getProfile)
router.route("/forget/password").post(forgetPassword)
router.route("/password/resetPassword/:token").put(resetPassword)
router.route("/my/posts").get(isAuthenticate, getMyPosts)

module.exports = router