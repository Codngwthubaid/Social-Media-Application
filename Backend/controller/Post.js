const { json } = require("express")
const Post = require("../models/Post")
const User = require("../models/User")

// Post Creation [post request]
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
        res.status(201).json({ success: true, Post: newPost })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// Post Deletion [delete request]
exports.deletePost = async (req, res) => {
    try {
        // finding post 
        const post = await Post.findById(req.params.id)

        // checking post presencess
        if (!post) return res.status(404).json({ success: false, message: "Post not found" })

        // Check the post owner and deletion user 
        if (post.owner.toString() !== req.user._id.toString()) return res.status(401).json({ success: false, message: "Unauthoraized" })
        await post.deleteOne()

        // Find user 
        const user = await User.findById(req.user._id)
        // Find index of the post
        const index = user.posts.indexOf(req.params.id)
        // Delete the Post
        user.posts.splice(index, 1)
        await user.save()

        res.status(200).json({ success: true, message: "Post Deleted" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


// Like and Unlike Post [get request]
exports.likeAndUnlikePost = async (req, res) => {
    try {
        // Finding Post
        const post = await Post.findById(req.params.id)

        // Check post present
        if (!post) return res.status(500).json({ success: false, message: "post not found ..." })

        // Condition for Like and Unlike
        if (post.likes.includes(req.user._id)) {
            // Getting index for postID
            const index = post.likes.indexOf(req.user._id)
            // Deleting that index 
            post.likes.splice(index, 1)
            // save to DB
            await post.save()

            // response to the user
            return res.status(200).json({ success: true, message: "Post Unliked" })
        } else {
            post.likes.push(req.user._id)
            await post.save()

            // response to the user
            return res.status(200).json({ success: true, message: "Post Liked" })
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


// Followed User Post
exports.getFollowedUserPost = async (req, res) => {
    try {

        // Find User
        const user = await User.findById(req.user._id)
        // Populate Followers posts
        const posts = await Post.find({
            owner: {
                $in: user.followering
            }
        })

        res.status(200).json({ success: true, posts })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}