const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.isAuthenticate = async (req, res, next) => {

    try {
        // Taking Token
        const { token } = req.cookies;
        // Token Presence Checking
        if (!token) return res.status(401).json({ message: "Please login First ..." })
        //decode token process 
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        // find user by ID
        req.user = await User.findById(decoded._id)
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}