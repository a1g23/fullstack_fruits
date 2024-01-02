
// Import Our Dependencies

require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")

const app = express()


// middleware

app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))














app.listen(PORT, () => console.log(`listening on ${PORT}`))

