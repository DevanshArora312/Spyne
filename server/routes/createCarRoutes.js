const express = require("express");
const router = express.Router();
const multer = require("multer");
const {createCar} = require("../controllers/createCar");
const { auth } = require("../middleware/auth");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/create-car",auth,upload.array('images', 10),createCar);

module.exports = router;