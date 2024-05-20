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
const {OrderModel} = require("./models/Order.js")
const morgan = require("morgan");
const Razorpay = require('razorpay')
const crypto = require("crypto")
const razorpay = new Razorpay({
    key_id: 'rzp_test_YoaD5WnvwTLPTk',
    key_secret: 'dfkIL1Agqr9Jl7orhHVTnPHK',
});



// app.use(cors())
app.use(morgan("dev"))
dotenv.config();

const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({extended:false}))
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

app.post("/payment/checkout",async(req,res)=>{
    const {name,amount} = req.body
    const order = await razorpay.orders.create({
        amount: amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    })

    const userCourse = new OrderModel({ // changes here await OrderModel.create
        order_id:order.id,
        name:name,
        amount:amount
    })
    const userdata=await userCourse.save()
    console.log({order})
    res.json({order})
})
app.post("/payment/paymentVerification",async(req,res)=>{
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body
    const body=razorpay_order_id + "|" +razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac("sha256", "dfkIL1Agqr9Jl7orhHVTnPHK")
    .update(body)
    .digest("hex"); 
    const isAuthentic = expectedSignature === razorpay_signature;
    if(isAuthentic){
        //database come here
        await OrderModel.findOne({order_id:razorpay_order_id},{
            $set:{
                razorpay_order_id, 
                razorpay_payment_id, 
                razorpay_signature,
                
            }
        });
        res.redirect(`http://localhost:4000/success?payment_id=${razorpay_payment_id}`);
        return
    }
    else{
        res.redirect("http://localhost:4000/failed");
        return
    }
})

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
            const user=new User({   //changes here User.create
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword
            })
            const userdata=await user.save()
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
        const useremail= await User.findOne({email:email})
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
				useremail,
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


// app.post("/course",async(req,res)=>{
//     try {
//         const {
// 			courseTitle,
// 			courseShortDesc,
// 			courseCategory,
// 			coursePrice,
//             courseBenefits,
//             courseTags,
//             courseRequirements
// 		} = req.body
//         if (
//             !courseTitle ||
//             !courseShortDesc ||
//             !courseCategory||
//             !coursePrice ||
//             !courseBenefits||
//             !courseTags||
//             !courseRequirements
//           ) {
//                 return res.status(400).json({
//                 success: false,
//                 message: "All Fields are required",
//                 })
//             }

//             const newCourse = await Course.create({
//                 courseTitle,
//                 courseShortDesc,
//                 courseCategory,
//                 coursePrice,
//                 courseBenefits,
//                 courseTags,
//                 courseRequirements,
//             })
//     } catch (error) {
//         // Handle any errors that occur during the creation of the course
//         console.error(error)
//             res.status(500).json({
//             success: false,
//             message: "Failed to create course",
//             error: error.message,
//         })
//     }
// })

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})