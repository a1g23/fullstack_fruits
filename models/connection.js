//Import Dependencies

require("dotenv").config() // read our .env file
const mongoose = require("mongoose")

// Establish Connection

//grab URL from .env
const DATABASE_URL = process.env.DATABASE_URL

//establish connection
mongoose.connect(DATABASE_URL)

//Connection events
mongoose.connection
.on("open", () => console.log("connected to MongoDB"))
.on("closed", () => console.log("Disconnected to MongoDB"))
.on("error", (err) => console.log(err.message))

//export connection
module.exports = mongoose