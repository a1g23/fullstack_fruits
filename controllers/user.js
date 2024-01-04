// Import Dependencies

const express = require("express")
const User = require("../models/User.js")
const bcrypt = require("bcryptjs")

// Create Router

const router = express.Router()


// Routes

// Signup Page Route (get -> /user/signup -> form)
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})



// Signup Submit Router (post -> /user/signup -> create the user)
router.post("/signup", async (req, res) => {
    try {
        // encrypt the password
        req.body.password = await bcrypt.hash(
            req.body.password,
            await bcrypt.genSalt(10)
        )

        console.log("Hashed Pass", req.body.password)

        // create the user
        await User.create(req.body)

        //send them to the login page
        res.redirect("/user/login")

    } catch(error) {
        console.log("-----", error.message, "------");
        res.status(400).send("error, read logs for details");
    }
})



// Login Page Route (get -> /user/login -> form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})



// Login Submit Route (post -> /user/login -> login the user)
router.post("/login", async (req, res) => {
    res.send("login")
})



// Logout Router (??? -> destroy the session)
router.get("/logout", async (req, res) => {
    res.send("logout")
})
// Export the Router

module.exports = router