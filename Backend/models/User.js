const mongoose = require("mongoose")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
        minlength: [8, "Password must have 8 charaters "],
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
    ],
    resetPasswordToken: String,
    resetPasswordExpiry: Date
})

// Generate hash passwod
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 10)
    console.log("Before saving:", this);
    next();
});


// Matching password
userSchema.methods.matchPassword = async function (password) {
    console.log(password, this.password);
    return await bcrypt.compare(password, this.password)
}


// Generating Token 
userSchema.methods.generationToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
}


// Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex")
    console.log(resetToken);
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpiry = Date.now() + 10 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model("User", userSchema)