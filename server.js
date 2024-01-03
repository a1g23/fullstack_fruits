
// Import Our Dependencies

require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override") // override for forms
const mongoose = require("mongoose") // connect to our mongodb

// Database Collection
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3013

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

app.use(morgan("dev")) // the string dev is the type of logs that morgan will send (in documentation)
app.use(methodOverride("_method")) // allow for put and delete requests
app.use(express.urlencoded({extended: true})) // parse url encoded bodys (forms that we can look reqs)
app.use(express.static("public")) // basically adding a folder of public to serve files


// ROUTES

//trial route - simple get
app.get("/", (req, res) => {
    res.send("your server is running")
})


//seed route to get test data
app.get("/fruits/seed", async (req, res) => {

    try {
    // array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
        ]
    // Delete All Fruits
    await Fruit.deleteMany({})

    // Seed my starter fruits
    const fruits = await Fruit.create(startFruits)

    // send a response (res) to end the route
    res.json(fruits)
    
    } catch (error) {
        res.send("There was an Error")
        console.log(error.message)
    }
})

//Index Route
app.get("/fruits", async (req, res) => {
    
    try{

        const fruits = await Fruit.find({})
        // render to a template
        res.render("fruits/index.ejs", {fruits})


    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})



//New Route
app.get("/fruits/new", (req, res) => {
    
    try{

        res.render("fruits/new.ejs")


    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})









//Create Route

app.post("/fruits", async (req, res) => {
    
    try{

        // checkbox gives you on or nothing (correct that data)
        // check if readytoEat should be true
        req.body.readyToEat = req.body.readyToEat === "on" ? true : false

        // find the url encoded new fruit with .body
        const newFruit = req.body

        //push the new fruit into the db (we can just use .create with the model because of mongoose)

        await Fruit.create(newFruit)

        res.redirect("/fruits")


    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})



//Edit Route

app.get("/fruits/:id/edit", async (req, res) => {
    
    try{
        // get the id
        const id = req.params.id

        // find the fruit in the db
        const indyFruit = await Fruit.findById(id)

        res.render("fruits/edit.ejs", {indyFruit})


    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})



//Update Route
app.put("/fruits/:id", async (req, res) => {
    
    try{

        // get the id

        const id = req.params.id
        // checkbox gives you on or nothing (correct that data)
        // check if readytoEat should be true
        req.body.readyToEat = req.body.readyToEat === "on" ? true : false

        // find the url encoded updated fruit with .body
        const updatedFruit = req.body

        //find the new id and then update the fruit into the db (we can just use .findbyIdandupdate with the model because of mongoose)

        await Fruit.findByIdAndUpdate(id, updatedFruit)

        res.redirect(`/fruits/${id}`)


    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})





//Delete Route

app.delete("/fruits/:id", async (req, res) => {

    //get the id
    const id = req.params.id

    //delete the fruit
    await Fruit.findByIdAndDelete(id)

    //redirect to main
    res.redirect('/fruits')

})




//Show Route

app.get("/fruits/:id", async (req, res) => {
    
    try{

        // get the id and store in a variable
        const id = req.params.id
        
        // find the particular fruit from the db

        const indyFruit = await Fruit.findById(id)

        //render the page for showing fruit

        res.render("fruits/show.ejs", {indyFruit})

    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})





// server listener
app.listen(PORT, () => console.log(`listening on ${PORT}`))

