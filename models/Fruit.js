//Import Dependencies and Connection
//taking it from the file connection because that Mongoose comes with the connection
const mongoose = require("./connection.js")

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

//export the model
module.exports = Fruit