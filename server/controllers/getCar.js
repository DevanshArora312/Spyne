const {carsModel} = require("../models/cars");
const {userModel} = require("../models/user");

exports.getAllCars = async (req,res) => {
    // console.log(req.user);
    try {
        const carsRes = await carsModel.find(); 
        // console.log(carsRes)
        return res.status(200).json(
            {
                ok:true,
                success:true,
                data : carsRes
            }
        )
    }
    catch(err){
        console.log("Some error occured!",err.message);
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

exports.getUserCar = async (req,res) => {
    // console.log(req.user);
    try {
        const id = req.user.id;
        const userAcc = await userModel.findById(id).populate("cars").exec();
        const cars = userAcc.cars; 
        // console.log(cars)
        return res.status(200).json(
            {
                ok:true,
                success:true,
                data : cars
            }
        )
    }
    catch(err){
        console.log("Some error occured!",err.message);
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

exports.getCarByID = async (req,res) => {
    try {
        const id = req.params.id;
        const cars = await carsModel.findById(id);
        // console.log(todos)
        
        if(!cars){
            return res.status(404).json(
                {
                    success : false,
                    message : "No Car found for given id"
                }
            )
        }
        return res.status(200).json(
            {
                ok:true,
                success:true,
                data : cars
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