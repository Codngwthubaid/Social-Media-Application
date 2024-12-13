// Here we creates Funtion which we used inside the routes folder

const User = require("../models/User")

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Checking User is present orr not
        let user = await User.findOne({ email })
        if (user)
            return res
                .status(400)
                .json({ success: false, message: "User already exist" })

        // Create a new User
        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_Id: "sample_id",
                url: "sample_url"
            }
        })
        res.status(201).json({ success: true, user })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
