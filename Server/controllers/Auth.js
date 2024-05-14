const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signup = async (req, res) => {
    try {
        // Destructure fields from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
        } = req.body
        // Check if All Details are there or not
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword 
        ){
            return res.status(403).send({
            success: false,
            message: "All Fields are required",
            })
        }
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
            success: false,
            message: "Password and Confirm Password do not match. Please try again.",
            })
        }
  
        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
            success: false,
            message: "User already exists. Please sign in to continue.",
            })
        }
  
        // Find the most recent OTP for the email
      
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
  
        // Create the user
        let approved = ""

        approved === "Instructor" ? (approved = false) : (approved = true)
  
        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: "",
        })
  
        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        })
    }catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        })
    }
}