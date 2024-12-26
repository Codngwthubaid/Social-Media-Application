const Post = require("../models/Post")
const User = require("../models/User")
const cloudinary = require("cloudinary")

// Post Creation [post request]
exports.createPost = async (req, res) => {
    try {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, { folder: "Posts" })
        // Post details
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_Id: myCloud.public_id,
                url: myCloud.secure_url
            },
            owner: req.user._id
        }

        // Creating new post
        const newPost = await Post.create(newPostData)

        // Finding User
        const user = await User.findById(req.user._id)
        // Push post ID to user
        user.posts.unshift(newPost._id)
        // Saving User
        await user.save()


        // Give response to user
        res.status(201).json({ success: true, message: "Post Successfully Created" })

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


// Update Post [put request]
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ success: false, message: "Post not found" })

        if (post.owner.toString() !== req.user._id.toString()) return res.status(401).json({ success: false, message: "Unauthorized" })
        post.caption = req.body.caption
        await post.save()

        res.status(200).json({ success: true, message: "Post Updated" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


// Follower Posts [get request]
exports.getFollowedUserPost = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        // Populate Followers posts
        const posts = await Post.find({ owner: { $in: user.followering } }).populate("owner likes comments.user")
        res.status(200).json({ success: true, posts: posts.reverse() })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


// Add and Update Post Comment [post request]
exports.addOrrUpdatePostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(400).json({ success: false, message: "Post not found" })

        let commentIndex = -1
        post.comments.forEach((comment, index) => {
            if (comment.user.toString() === req.user._id.toString()) {
                commentIndex = index
            }
        })
        if (commentIndex !== -1) {
            post.comments[commentIndex].comment = req.body.comment
            await post.save()
            res.status(200).json({ success: true, message: "Comment Successfully Updated" })
        } else {
            post.comments.push({ user: req.user._id, comment: req.body.comment })
            await post.save()
            res.status(200).json({ success: true, message: "Comment Successfully Added" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


// Delete Commets [delete request]
exports.deletePostComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(400).json({ success: false, message: "Post not found" })

        // Owner have the super power for delete any comment
        if (post.owner.toString() === req.user._id.toString()) {
            if (req.body.commentId == undefined) return res.status(400).json({ success: false, message: "Comment ID is required" })

            post.comments.forEach((comment, index) => {
                if (comment._id.toString() === req.body.commentId.toString()) {
                    post.comments.splice(index, 1)
                }
            })
            await post.save()
            res.status(200).json({ success: true, message: "Selected Comment Deleted" })
        } else {
            // User can delete only his/her comment
            post.comments.forEach((comment, index) => {
                if (comment.user.toString() === req.user._id.toString()) {
                    post.comments.splice(index, 1)
                }
            })
            await post.save()
            res.status(200).json({ success: true, message: "Your Comment Deleted" })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}



// post chaiye
// check post
// owner regards super powers
// normal user = normal power
// save , response user 






































