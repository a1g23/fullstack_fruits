
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


// create our Fruits Model

//destructure Schema and model into their own models
const {Schema, model} = mongoose
//same thing as: 
//const Schema = mongoose.Schema
//const model = mongoose.model

//make the Schema for fruit or SHAPE of the data
const fruitSchema = new Schema ({
    name: String,
    color: String,
    readyToEat: Boolean
})

// attach the Schema to a model (the object for interacting with the database) - singular and uppercase first
const Fruit = model("Fruit", fruitSchema)


// run the app
const app = express()


// middleware

app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))














app.listen(PORT, () => console.log(`listening on ${PORT}`))

