const {carsModel} = require("../models/cars");
const { userModel } = require("../models/user");

exports.createCar = async (req,res) => {
    try {
        const {title,desc,tags} = req.body.formData;
        const newTodo = new carsModel({title,desc,tags,thumb:"default",byUser : req.user.id});
        const savedCar = await newTodo.save();
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