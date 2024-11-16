const {carsModel} = require("../models/cars");
const { userModel } = require("../models/user");
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});
 
exports.createCar = async (req,res) => {
    try {
        const { title, tags, desc } = req.body;
        const images = req.files;
        // console.log(req.files)
        const cloudinaryResponses = [];
        for (let image of images) {
            // Wrap the upload in a promise for better control
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto' },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result);
                    }
                );
                streamifier.createReadStream(image.buffer).pipe(uploadStream);
            });

            cloudinaryResponses.push(result);
        }

        const imageUrls = cloudinaryResponses.map(response => response.secure_url);

        const newCar = new carsModel({title,desc,tags,thumb:imageUrls[0],byUser : req.user.id,images:imageUrls});
        const savedCar = await newCar.save();
        const response = await userModel.findByIdAndUpdate(req.user.id,{$push : {cars : savedCar}},{new : true})
        return res.status(200).json(
            {
                ok:true,
                success : true,
                data : savedCar
            }
        )
    }
    catch(err){
        console.log("Some error occured in car creation :",err.message);
        return res.status(500).json(
            {
                ok:false,
                success:false,
                data : "Internal server error occured!"
            }
        )
    }
}