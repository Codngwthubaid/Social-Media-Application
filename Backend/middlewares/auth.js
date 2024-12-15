const User = require("../models/User")
const jwt = require("jsonwebtoken")


exports.isAuthenticate = async (req, res, next) => {

    // Taking Token
    const { token } = req.cookie;
    if (!token) return res.status(401).json({ message: "Please Login First ..." })
}