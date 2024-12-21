# NUSM - Social Media Web Application

![NUSM Logo](https://via.placeholder.com/150)

NUSM (Next-Generation User Social Media) is a feature-rich social media web application built using the MERN stack. This application offers users a seamless and engaging experience, providing a variety of functionalities that allow them to connect, interact, and express themselves. The platform is designed to be user-friendly, scalable, and visually appealing, with modern styling and advanced features.

## Features

### User Features:
- **User Registration**: Create an account to join the platform. ![Register Icon](https://via.placeholder.com/20)
- **User Authentication**: Secure login and logout. ![Lock Icon](https://via.placeholder.com/20)
- **Password Reset**: Forgot password functionality using Nodemailer. ![Reset Icon](https://via.placeholder.com/20)
- **Profile Management**: Users can delete their own accounts. ![Profile Icon](https://via.placeholder.com/20)

### Social Features:
- **Post Management**: Create posts with captions, delete your posts. ![Post Icon](https://via.placeholder.com/20)
- **Interactions**:
  - Like and unlike posts. ![Like Icon](https://via.placeholder.com/20)
  - Comment on posts. ![Comment Icon](https://via.placeholder.com/20)
- **Follow System**:
  - Follow other users. ![Follow Icon](https://via.placeholder.com/20)
  - See a list of followers and following. ![Followers Icon](https://via.placeholder.com/20)
- **Search Users**: Search for other users by their names. ![Search Icon](https://via.placeholder.com/20)

### Real-Time Communication:
- **Instant Chat**: Real-time messaging with followers using Socket.IO. ![Chat Icon](https://via.placeholder.com/20)

### UI/UX:
- Responsive and modern design using **TailwindCSS**, **MUI**, and **Lucide React** packages. ![UI Icon](https://via.placeholder.com/20)

![Features Illustration](https://via.placeholder.com/600x300)

## Project Structure

The project is organized into two main folders:

### 1. Frontend
The frontend is built with React.js, TailwindCSS, and other modern libraries to provide a sleek and responsive user interface.

### 2. Backend
The backend is built with Node.js, Express.js, and MongoDB to handle all server-side logic and data storage. 

### Key Packages Used:
- **Socket.IO**: For real-time chat functionality.
- **Nodemailer**: For implementing the password reset feature.
- **Lucide React**: For modern and lightweight icons.
- **MUI**: For additional UI components.

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js ![Node.js Icon](https://via.placeholder.com/20)
- MongoDB ![MongoDB Icon](https://via.placeholder.com/20)

### Steps to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/NUSM.git
   cd NUSM
   ```

2. Navigate to the Backend folder and install dependencies:
   ```bash
   cd Backend
   npm install
   ```

3. Set up environment variables in a `.env` file in the `Backend` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Navigate to the Frontend folder and install dependencies:
   ```bash
   cd ../Frontend
   npm install
   ```

6. Start the frontend development server:
   ```bash
   npm start
   ```

7. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

![Setup Illustration](https://via.placeholder.com/600x300)

## Tech Stack

- **Frontend**:
  - React.js ![React Icon](https://via.placeholder.com/20)
  - TailwindCSS ![TailwindCSS Icon](https://via.placeholder.com/20)
  - MUI ![MUI Icon](https://via.placeholder.com/20)
  - Lucide React ![Lucide Icon](https://via.placeholder.com/20)

- **Backend**:
  - Node.js ![Node.js Icon](https://via.placeholder.com/20)
  - Express.js ![Express Icon](https://via.placeholder.com/20)
  - MongoDB ![MongoDB Icon](https://via.placeholder.com/20)

- **Additional Libraries**:
  - Socket.IO ![Socket.IO Icon](https://via.placeholder.com/20)
  - Nodemailer ![Nodemailer Icon](https://via.placeholder.com/20)

## Future Enhancements
- Add notifications for post interactions (likes, comments, follows).
- Implement additional filters and sorting in the search feature.
- Improve chat functionality with multimedia sharing.
- Add analytics for user activity and engagement.

![Future Enhancements](https://via.placeholder.com/600x300)

## Contribution
Contributions are welcome! Feel free to fork the repository, raise issues, or submit pull requests to improve the project.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements
- Thanks to all contributors and users who made this project possible.
- Inspired by modern social media platforms and their innovative features.

![Thank You](https://via.placeholder.com/600x300)






















<!-- Auth.js -->
const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.isAuthenticate = async (req, res, next) => {

    try {
        // Taking Token
        const { token } = req.cookies;
        // Token Presence Checking
        if (!token) return res.status(401).json({ message: "Please login First ..." })
        //decode token process 
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        // find user by ID
        req.user = await User.findById(decoded._id)
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



<!-- Sending Email -->
const nodemailer = require("nodemailer")


exports.emailSender = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE, // true for port 465, false for other ports
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOpotions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    } 


    await transporter.sendMail(mailOpotions)
}



























<!-- Post router -->
router
    .route("/posts")
    .get(isAuthenticate, getFollowedUserPost)

router
    .route("/post/comments/:id")
    .put(isAuthenticate, addOrrUpdatePostComments)
    .delete(isAuthenticate, deleteComments)
    


























<!-- Post Controller -->

// Update Post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(400).json({ success: false, message: "Post not found" })

        if (post.owner.toString() !== req.user._id.toString()) return res.status(400).json({ success: false, message: "Unauthorized" })
        post.caption = req.body.caption
        await post.save()

        res.status(200).json({ success: true, message: "Caption Successfully Updated" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
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


// Add Orr Upadte Post Comments
exports.addOrrUpdatePostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(400).json({ success: false, message: "Post not found" })

        // Init a indexValue by own 
        let commentIndex = -1;

        // Checks comment allready exist orr not , if yes then assign them to the current index
        post.comments.forEach((item, index) => {
            if (item.user.toString() === req.user._id.toString()) commentIndex = index;
        });

        if (commentIndex !== -1) {
            post.comments[commentIndex].comment = req.body.comment
            await post.save()
            res.status(200).json({ success: true, message: "Comments Successfully Updated" })
        } else {
            // Adding new comments if user comment for the first time
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            })
            await post.save()
            res.status(200).json({ success: true, message: "Comment Successfully Added" })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


// Delete Comments
exports.deleteComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(400).json({ success: false, message: "Post not found" })

        // Owner have the power to deletes all the comments
        if (post.owner.toString() === req.user._id.toString()) {
            // Check commentId is present orr not
            if (req.body.commentId == undefined) return res.status(400).json({ success: false, message: "CommentId is required" })

            // delete any comment
            post.comments.forEach((item, index) => {
                if (item._id.toString() === req.body.commentId.toString()) return post.comments.splice(index, 1)
            });

            await post.save()
            res.status(200).json({ success: true, message: "Selected Comment Successfully Deleted" })

        } else {
            // For Other User to Delete their Comments
            post.comments.forEach((item, index) => {
                if (item.owner.toString() === req.user._id.toString()) return post.comments.splice(index, 1)
            });

            await post.save()
            res.status(200).json({ success: true, message: "Your Comment Successfully Deleted" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
