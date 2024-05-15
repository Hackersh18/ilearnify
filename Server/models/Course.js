const mongoose = require("mongoose");

// Define the Courses schema
const coursesSchema = new mongoose.Schema({
	courseTitle: { type: String },
	courseShortDesc: { type: String },
	courseCategory: {
		type: String,
	},
	// courseContent: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Section",
	// 	},
	// ],
	// ratingAndReviews: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "RatingAndReview",
	// 	},
	// ],
	coursePrice: {
		type: Number,
	},
	courseBenefits: {
		type: String,
	},
	courseTags: {
		type: String,
		required: true,
	},
	// category: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	// required: true,
	// 	ref: "Category",
	// },
	// studentsEnrolled: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		required: true,
	// 		ref: "user",
	// 	},
	// ],
	// instructions: {
	// 	type: [String],
	// },
	// status: {
	// 	type: String,
	// 	enum: ["Draft", "Published"],
	// },
	courseRequirements: {
		type:String,
		required:true,
	},
});

// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema);