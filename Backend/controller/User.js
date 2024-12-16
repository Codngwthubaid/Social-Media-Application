const User = require("../models/User")
const Post = require("../models/Post")

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

        // Generating Token
        const token = await user.generationToken()

        // Token Options
        let options = { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true, secure: true }

        // Sending response
        res.status(201).cookie("token", token, options).json({ success: true, user, token, messsage: "Login Successfully ..." })


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
        let options = { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true, secure: true }

        // Sending response
        res.status(200).cookie("token", token, options).json({ success: true, user, token })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


// Follow and Unfollow User 
exports.followUser = async (req, res) => {
    try {

        // finding anotherUser
        const userToFollow = await User.findById(req.params.id)
        // finding ourself
        const loggedInUser = await User.findById(req.user._id)

        // check if anotherUser ID not found 
        if (!userToFollow) return res.status(404).json({ success: false, message: "User not found" })

        // Unfollow the loggedInUser
        if (loggedInUser.followering.includes(userToFollow._id)) {
            const indexofFollowing = loggedInUser.followering.indexOf(userToFollow._id)
            const indexofFollower = userToFollow.followers.indexOf(loggedInUser._id)

            loggedInUser.followering.splice(indexofFollowing, 1)
            userToFollow.followers.splice(indexofFollower, 1)

            await loggedInUser.save()
            await userToFollow.save()

            res.status(200).json({ success: true, message: "User Unfollow" })
        }
        // Follow the loggedInUser
        else {
            // push ourself to anotherUser DB
            loggedInUser.followering.push(userToFollow._id)
            // push anotherUser to ourself DB
            userToFollow.followers.push(loggedInUser._id)

            // save both user's 
            await loggedInUser.save()
            await userToFollow.save()

            res.status(200).json({ success: true, message: "User Follow" })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


// For Deletion
exports.logout = async (req, res) => {
    try {
        // Remove the token from the cookie
        res.status(200).cookie("token", null, { expires: new Date(Date.now()), httpOnly: true, secure: true }).json({ success: true, message: "Logout Successflly" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


// Update Password
exports.updatePassword = async (req, res) => {
    try {
        // Find User
        const user = await User.findById(req.user._id).select("+password")
        const { oldPassword, newPassword } = req.body

        // Checks oldPassword orr newPassword present or not
        if (!oldPassword || !newPassword) return res.status(400).json({ success: false, message: "Provide old orr new password" })

        // Matching Password
        const isMatch = await user.matchPassword(oldPassword)
        if (!isMatch) return res.status(400).json({ success: false, message: "Old Password Incorrect" })
        // Saving newPassword
        user.password = newPassword

        await user.save()
        res.status(200).json({ success: true, message: "Password Successfully Changed" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        // Finding User
        const user = await User.findById(req.user._id)
        // Getting credetianls
        const { name, email } = req.body
        // Updating credetianls
        if (name) user.name = name
        if (email) user.email = email
        // Avator infuture


        await user.save()
        res.status(200).json({ success: true, message: "Profile Successfully Updated" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.messsage })
    }
}


// Delete User
exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const posts = user.posts
        const followers = user.followers
        const followings = user.followering
        const userID = user._id

        // Deleting user profile
        await user.deleteOne()

        // Instant logout the user profile
        res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true, secure: true })

        // Removing User from Followers Following
        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i])
            const index = follower.followering.indexOf(userID)
            follower.followering.splice(index, 1)
            await follower.save()
        }

        // Removing User from Following Followers
        for (let i = 0; i < followings.length; i++) {
            const follows = await User.findById(followings[i])
            const index = follows.followers.indexOf(userID)
            follows.followers.splice(index, 1)
            await follows.save()
        }

        // Deleting all posts of the user
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i])
            await post.deleteOne()
        }

        res.status(200).json({ success: true, message: "User Successfully Deleted" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


// Get Profile Details
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("posts")
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}