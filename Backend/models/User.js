const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name... "]
    },
    avatar: {
        url: String,
        public_Id: String
    },
    email: {
        type: String,
        required: [true, "Please enter an email... "],
        unique: [true, "Email already exist... "]
    },
    password: {
        type: String,
        required: [true, "Please enter a password... "],
        validate: {
            validator: function (value) {
                // Regular expression for password complexity
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message:
                "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        },
        select: false
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followering: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})
userSchema.pre("save", function (next) {
    console.log("Before saving:", this);
    next();
});

module.exports = mongoose.model("User", userSchema)