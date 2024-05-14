const express = require("express")
const router = express.Router()
const {
    // login,
    signup,
    // sendotp,
    // changePassword,
} = require("../controllers/Auth")


const { auth } = require("../middlewares/auth")



// Route for user signup
// router.post("/signup", signup)






// Export the router for use in the main application
module.exports = router