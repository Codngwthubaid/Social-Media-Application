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
