const {carsModel} = require("../models/cars");

exports.deleteCar = async (req,res) => {
    try {
        const {id} = req.params;
        const carInstance = await carsModel.findById(id);
        // console.log(todoInstance)
        if(!carInstance){
            return res.status(404).json({
                success:false,
                message:"No car found!"
            })
        }
        
        const cars = await carsModel.findByIdAndDelete(id);
        
        return res.status(200).json(
            {
                ok:true,
                success:true,
                message:"deleted succesfully"
            }
        )
    }
    catch(err){
        console.log("Some error occured!");
        return res.status(500).json(
            {
                ok:false,
                success:false,
                error : err.message,
                message : "Server error occured!"           
            }
        )
    }
}