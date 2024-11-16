require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = () =>{
    mongoose.connect(process.env.DB_URL,{
        useNewurlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("connected Succesfully ");
    }).catch((error) => {
        console.log("Recieved an error" ,error );
    })
}

module.exports = dbConnect;