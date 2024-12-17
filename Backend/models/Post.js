const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption: String,
    image: {
        url: String,
        public_Id: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            comment: {
                type: String,
                require: true
            }
        }
    ]
})


module.exports = mongoose.model("Post", postSchema)