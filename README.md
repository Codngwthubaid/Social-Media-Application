# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
Here’s a README.md file tailored for your NUSM project:

# NUSM - A Vibrant Social Media Platform

NUSM is a dynamic social media platform that connects users through engaging content, creative collaborations, and community-driven interactions. It fosters an interactive space for sharing ideas and experiences. 

## Features

- User Authentication and Profile Management
- Real-Time Post Creation and Engagement
- Commenting, Sharing, and Liking Posts
- Creative Collaboration Spaces
- Dynamic Feed and Search Functionality
- Community-Driven Interaction Tools

## Tech Stack

NUSM is built using the *MERN stack*:

- *MongoDB*: For a robust and scalable database solution.
- *Express.js*: For efficient server-side operations and API handling.
- *React.js*: For a responsive and engaging user interface.
- *Node.js*: For a high-performance backend.

## Installation

To set up the project locally:

1. *Clone the repository*  
   ```bash
   git clone https://github.com/yourusername/nusm.git
   cd nusm

2. Install dependencies
Navigate to the backend and frontend directories separately and install required dependencies:

cd backend
npm install
cd ../frontend
npm install


3. Environment Variables
Create a .env file in the backend directory and add the following:

MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
CLOUDINARY_URL=<Your Cloudinary URL> # if using Cloudinary for media


4. Run the Application

Start the backend server:

cd backend
npm start

Start the frontend development server:

cd frontend
npm start



5. Access the app at http://localhost:3000.



Folder Structure

nusm/
├── backend/       # Express.js server and API logic
│   ├── models/    # Mongoose schemas
│   ├── routes/    # API routes
│   └── utils/     # Helper functions
├── frontend/      # React.js frontend
│   ├── src/       # Source files
│   ├── components # Reusable components
│   └── assets/    # Static assets
├── README.md      # Project documentation

Features in Progress

Direct Messaging

Advanced Search Filters

Theme Customization

Multi-Language Support


Contribution Guidelines

Contributions are welcome! To contribute:

1. Fork the repository.


2. Create a new branch (feature/your-feature).


3. Commit your changes.


4. Push to the branch.


5. Open a Pull Request.



License

This project is licensed under the MIT License.

Contact

For any inquiries or feedback, contact us at contact@nusm.com.

Let me know if you want any additions or changes!



























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