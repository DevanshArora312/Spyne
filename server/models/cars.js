const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
    {
        title : {
            type:String,
            required:true,
            maxLength:50
        },
        desc : {
            type:String,
            required:false,
        },
        tags: {
            type:String,
            required:true,
            maxLength:500
        },
        images:{
            type:[String],
            required:false,
            default:null
        },
        thumb:{
            type:String,
            required:true,
            default:null
        },
        byUser : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "user"
        }

    }
)

const carsModel = mongoose.model("cars" , carSchema);

module.exports = { carsModel }