const {carsModel} = require("../models/cars");

exports.updateCar = async (req,res) => {
    try {
        
        const {id} = req.params;
        const {title,desc,tags} = req.body.formData;
        const carsInstance = await carsModel.findById(id);
        if(!carsInstance){
            return res.status(404).json({
                success:false,
                message:"No todo found!"
            })
        }
        if(carsInstance.byUser.toString() !== req.user.id.toString()){ 
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }
        const cars = await carsModel.findByIdAndUpdate(
            {_id : id},
            {title,desc,tags}            
        );
        
        return res.status(200).json(
            {
                ok:true,
                success:true,
                message:"updated succesfully"
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
