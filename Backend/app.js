const express = require("express")
const dotenv = require("dotenv")
const app = express()

if (process.env.NODE_ENV !== "production") dotenv.config({ path: "Backend/config/.env" }) 

module.exports = app 