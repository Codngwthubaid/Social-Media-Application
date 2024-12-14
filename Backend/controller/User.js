const User = require("../models/User")

// For Registration  
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        console.log(`User Details comes from body\n Name : ${name}\n Email : ${email}\n Password : ${password}`);


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

        // Saving User
        await user.save();
        console.log("User created successfully")

        // Sending response to user
        res.status(201).json({ success: true, user })


    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: `User validation failed: ${errors.join(", ")}`,
            });
        }
        res.status(500).json({ success: false, message: error.messag })
    }
}


// For Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(`User Details comes from body\nEmail : ${email}\n Password : ${password}`);
        const user = await User.findOne({ email }).select("+password")

        // Check User's presence
        if (!user)
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User does not exist ..."
                })

        const isMatch = await user.matchPassword(password)
        // Matching password
        if (!isMatch)
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Incorrect Password ..."
                })


        // Generating Token
        const token = await user.generationToken()

        // Token Options
        const options = { expires: new Date().now + 30 * 24 * 60 * 60 * 1000, httpOnly: true }

        // Sending response
        res.status(200).cookie("token", token, options).json({ success: true, user, token })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

