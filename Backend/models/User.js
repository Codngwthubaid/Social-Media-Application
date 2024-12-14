const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please enter a name... "]
    },
    avatar: {
        url: String,
        public_Id: String
    },
    email: {
        type: String,
        require: [true, "Please enter an email... "],
        unique: [true, "Email already exist... "]
    },
    password: {
        type: String,
        require: [true, "Please enter a password... "],
        minlength: [8, "Password must be at least 8 characters..."],
        validate: {
            validator: function (value) {
                // Regular expression for password complexity
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message:
                "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        },
        select: false
        //(?=.*[a-z]): Ensures the password contains at least one lowercase letter.
        // (?=.*[A-Z]): Ensures the password contains at least one uppercase letter.
        // (?=.*\d): Ensures the password contains at least one digit.
        // (?=.*[@$!%*?&]): Ensures the password contains at least one special character from the set @$!%*?&.
        // [A-Za-z\d@$!%*?&]{8,}: Ensures the password has a minimum length of 8 characters and contains only valid characters.
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


module.exports = mongoose.model("User", userSchema)