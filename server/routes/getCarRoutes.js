const express = require("express");
const router = express.Router();

const {getAllCars,getCarByID,getUserCar} = require("../controllers/getCar");
const {updateCar} = require("../controllers/updateCar");
const {deleteCar} = require("../controllers/deleteCar");
const { auth } = require("../middleware/auth");


router.get("/get-cars/",getAllCars);
router.get("/my-cars/",auth,getUserCar);
router.get("/get-car/:id",auth,getCarByID);
router.put("/update-car/:id",auth,updateCar);
router.delete("/delete-car/:id",deleteCar);

module.exports = router;
