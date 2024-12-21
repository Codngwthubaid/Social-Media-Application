const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.isAuthenticate = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ success: false, msg: "Login First ..." })

        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decode._id);
        next()
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
