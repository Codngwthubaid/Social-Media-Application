const Post = require("../models/Post")
const User = require("../models/User")

exports.createPost = async (req, res) => {
    try {
        // Post details
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_Id: "req.body.public_Id",
                url: "req.body.url"
            },
            owner: req.user._id
        }

        // Creating new post
        const newPost = await Post.create(newPostData)

        // Finding User
        const user = await User.findById(req.user._id)
        // Push post ID to user
        user.posts.push(newPost._id)
        // Saving User
        await user.save()


        // Give response to user
        res.status(201).json({ success: true, Post : newPost })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}