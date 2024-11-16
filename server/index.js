const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/database");
const app = express();
const createCarRoutes = require("./routes/createCarRoutes");
const getCarRoutes = require("./routes/getCarRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api",createCarRoutes);
app.use("/api",getCarRoutes);
app.use("/api",userRoutes);
app.get("/",(req,res) => {
    res.send("Default Route! Web service is on!");
})


app.listen(process.env.PORT, () => {
    console.log("Server started at port",process.env.PORT);
})

dbConnect();
