import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


//SignUp
export const signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email})
        if(existingUser){
           return res.status(400).json({message:"User already exitsts"})
        }
        const user= new User({name,email,password})
        await user.save();
        const token = generateToken(user._id);
        res.status(200).json({message:"SignUp Successfull", token,user:{name:user.name}})
    } catch (error) {
        res.status(500).json({message:"Error signing up",error:error.message})
    }
}


//Login
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const isMatch= await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=generateToken(user._id);
        res.status(200).json({message:'Login successful',token, user:{name:user.name,isAdmin:user.isAdmin}})
    } catch (error) {
      res.status(500).json({message:"Login failed",error:error.message})  
    }
}