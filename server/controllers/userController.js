const {userModel} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.isLoggedin = async(req,res) => {
    if(!req.user){
        return res.status(400).json({
            success:false,
            message:"user is not logged in!"
        })
    }
    return res.status(200).json({
        success:true,
        reqUserId : req.user.id,
        message:"user is logged in!"
    })
}

exports.signup = async(req,res) => {   
    try{
        const {username,email,password} = req.body;
        if(username === ""){
            return res.status(400).json({
                success:false,
                message:"Username can't be empty!"
            })
        }
        if(email === ""){
            return res.status(400).json({
                success:false,
                message:"Email can't be empty!"
            })
        }
        if(password === ""){
            return res.status(400).json({
                success:false,
                message:"Password can't be empty!"
            })
        }
        const user = await userModel.findOne({email});
        if (user){
            res.status(400).json(
                {
                    ok:false,
                    success:false,
                    message:"Email already exists!"
                }
            )
            return;
        }
        let newpassword;
        try{
            newpassword = await bcrypt.hash(password,10);
        }
        catch(err){
            console.log("Error in hashing!");
        }
        const response = await userModel.create({username,email,password:newpassword});
        const payLoad = {
            email : response.email,
            id : response._id,
        }
        let token = jwt.sign(payLoad,process.env.JWT_SECRET_KEY,{ expiresIn: "48h" });
            
        res.status(200).json(
            {
                ok:true,
                success:true,
                data:response,
                token
            }
        )
    }
    catch(err){
        console.log(err.message);
        res.status(500).json(
            {
                ok:false,
                success:false,
                message:"Server Error"
            }
        )
    }
}

exports.login = async(req,res) => {   
    try{
        const {email,password} = req.body;
        
        let user = await userModel.findOne({email});
        if (!user){
            res.status(401).json(
                {
                    ok:false,
                    success:false,
                    message:"Account with given email not found!"
                }
            )
            return;
        }

        const payLoad = {
            email : user.email,
            id : user._id,
        }

        if (await bcrypt.compare(password,user.password)){
            
            let token = jwt.sign(payLoad,process.env.JWT_SECRET_KEY,{ expiresIn: "72h" });
            res.status(200).json(
                {
                    ok:true,
                    success:true,
                    token,
                    message:"Login Successful!"
                }
            )
        }
        else{
            res.status(403).json({
                success:false,
                message:"password does not match!"
            })
        }
        
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json(
            {
                ok:false,
                success:false,
                data:"Server Error"
            }
        )
    }
}

exports.getUser = async (req,res) => {
    if(!req.user){
        return res.status(401).json({
            success : false,
            message : "Unauthorized!"
        })
    }
    try{
        const {id} = req.user;
        const user = await userModel.findById(id);
        return res.status(200).json({
            success:true,
            user : user
        })
    } catch (err){
        return res.status(500).json(
            {
                ok:false,
                success:false,
                data:"Server Error"
            }
        )
    }
}
exports.updateUser = async (req,res) => {
    if(!req.user){
        return res.status(401).json({
            success : false,
            message : "Unauthorized!"
        })
    }
    try{
        const {id} = req.user;
        const reqUser = req.body.user;
        const user = await userModel.findByIdAndUpdate(id,{username : reqUser.username , bio : reqUser.bio});
        return res.status(200).json({
            success:true,
            user : user
        })
    } catch (err){
        return res.status(500).json(
            {
                ok:false,
                success:false,
                data:"Server Error"
            }
        )
    }
}