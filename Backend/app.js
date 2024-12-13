const express = require("express")
const dotenv = require("dotenv")
const app = express()

if (process.env.NODE_ENV !== "production") dotenv.config({ path: "Backend/config/.env" })


// Using Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Importing Routes 
const postRouter = require("./routes/Post")
// Using Route
app.use("/api/v1", postRouter)


module.exports = app 