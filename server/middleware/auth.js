const jwt = require("jsonwebtoken");
require("dotenv").config();
 
exports.auth = async (req,res,next) => {
    try{
        // console.log(req.headers)
        const token = req.headers["authorization"].replace("Bearer ","");
        // console.log(token)
        if (!token){
            return res.status(401).json(
                {
                    success:false,
                    message : "TOKEN_INVALID_ERR_1"
                }
            )
        }
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
            // console.log(payload);
            req.user = payload;
            
        } catch (err){
            return res.status(401).json(
                {
                    success:false,
                    message : "TOKEN_INVALID_ERR"
                }
            )
        }
        next();
    }
    catch(err){
        console.log(err.message)
        return res.status(401).json(
            {
                success:false,
                message:"something went wrong while verifying the token"
            }
        )
    }
    
}

exports.isUser = async (req,res,next) => {
    try{
        if (req.user.role !== "User"){
            return res.status(401).json(
                {
                    success:false,
                    message:"This is a protected route for user accounts!"
                }
            )
        }
        next();

    } catch (err){
        return res.status(401).json(
            {
                success:false,
                message:"Cannot verify User role!"
            }
        )
    }
}

exports.isAdmin = async (req,res,next) => {
    try{
        if (req.user.role !== "Admin"){
            return res.status(401).json(
                {
                    success:false,
                    message:"This is a protected route for Admin accounts!"
                }
            )
        }
        next();

    } catch (err){
        return res.status(401).json(
            {
                success:false,
                message:"Cannot verify User role!"
            }
        )
    }
}