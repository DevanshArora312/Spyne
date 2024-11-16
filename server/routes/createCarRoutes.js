const express = require("express");
const router = express.Router();

const {createCar} = require("../controllers/createCar");
const { auth } = require("../middleware/auth");
router.post("/create-car",auth,createCar);

module.exports = router;