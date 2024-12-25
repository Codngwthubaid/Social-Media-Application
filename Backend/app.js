const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()

if (process.env.NODE_ENV !== "production") dotenv.config({ path: "Backend/config/.env" })

// Using Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true, }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Importing Routes 
const postRouter = require("./routes/Post")
const userRouter = require("./routes/User")
// Using Route
app.use("/api/v1", postRouter)
app.use("/api/v1", userRouter)


module.exports = app 