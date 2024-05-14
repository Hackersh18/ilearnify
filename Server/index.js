const express = require("express");
const app = express();
const userRoutes = require("./routes/user.js");
const dotenv = require("dotenv");
// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payments");
// const courseRoutes = require("./routes/Course");
// const contactUsRoute = require("./routes/Contact");
const database = require("./config/dbconnect");
var cookieParser = require('cookie-parser')
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const User = require("./models/User.js");


dotenv.config();

const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

//cloudinary connection
cloudinaryConnect();


//routes
//	app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

//def route

app.post("/signup", async (req,res)=>{
    try{
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword
		  } = req.body
        if(password==confirmPassword){
            const user=await User.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword
            })
            return res.status(200).json({
				success: true,
				user,
				message: "User registered successfully",
			  })
        }
		else{
            return res.status(500).json({
				success: false,
				message: "User cannot be registered. Please try again.",
			  })
        } 
    }catch(error){
        res.status(400).send(error);
    }
});
app.post("/login", async(req,res)=>{
    try{
        // Get email and password from request body
        const { email, password } = req.body

        // Check if email or password is missing
        if (!email || !password) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            })
        }
        const useremail= await user.findOne({email:email})
        if (!useremail) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User is not Registered with Us Please SignUp to Continue`,
            })
        }
        if(useremail.password==password){
            res.status(200).json({
                success: true,
                message: `User Login Success`,
            })
        }else{
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            })
        }
    }catch(error){
        console.error(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        })
    }
});




app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})