 // Here we creates Funtion which we used inside the routes folder

const Post = require("../models/Post")

exports.createPost = async (req, res) => {
    try {

        const newPostData = {
            caption : req.body.caption,
            image : {
                public_Id : "req.body.publi_Id",
                url : "req.body.url" 
            },
            owner : req.body.owner
        }

        const newPost = await Post.create(newPostData)

        res.status(201).json({
            success : true,
            Post: newPost
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}