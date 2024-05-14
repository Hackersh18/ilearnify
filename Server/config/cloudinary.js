const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect =async () => {
	try {
		cloudinary.config({
			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});
        // console.log('cloudinary connect successfully');
        // const uploadResult = await cloudinary.uploader.upload("/Users/nitishchauhan/Desktop/learnify/Server/feature-img-1.png", {
        //     public_id: "shoes"
        // }).catch((error)=>{console.log(error)});
        // console.log(uploadResult);

	} catch (error) {
		console.log(error);
	}
};

