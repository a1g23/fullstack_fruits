
// Import Our Dependencies

require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override") // override for forms
const mongoose = require("mongoose") // connect to our mongodb

// Database Collection
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT

//establish our connection

mongoose.connect(DATABASE_URL)

// events to help you understand when connection changes

mongoose.connection.on("open", () => console.log("connected to mongoDB"))
mongoose.connection.on("close", () => console.log("disconnected to mongoDB"))
mongoose.connection.on("error", (err) => console.log(err))

// run the app
const app = express()


// middleware

app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))














app.listen(PORT, () => console.log(`listening on ${PORT}`))

