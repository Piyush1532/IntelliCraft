import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import tokenBlacklistModel from "../models/blackListModel.js";


export const registerUser=async (req,res) => {
    try {
        // extract name,email,password
       const {username,email,password}=req.body 

        // validate input
       if (!username || !email||!password) {
        return res.status(400).json({message:"Please provide username,email and password"})
       }

    //    to find uername or email
       const ifUserAlreadyExist=await userModel.findOne({
        $or:[{username},{email}]
       })
        //  if username exist retuen error
       if (ifUserAlreadyExist) {
              return res.status(400).json({message:"Account already exists with this email address or username"})
       }
    //  hashing password 
       const hashPassword=await bcrypt.hash(password,10)

    //    creating user
       const user=await userModel.create({
        username,
        email,
        password:hashPassword
       })


    //    generating token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token",token,{
         httpOnly: true,
    })
     res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .json({
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });

    } catch (error) {
              return res.status(200).json({error})
             
    }
}


export const loginUser=async (req,res) => {
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if (!user || !password) {
                  return res.status(400).json({message:"Invalid email or passoword"})
        }

        const isPasswordValid=await bcrypt.compare(password,user.password)

        if (!isPasswordValid) {
                  return res.status(400).json({message:"Invalid Email or Password "})
        }

              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

      res.cookie("token",token,{
         httpOnly: true,
      })
    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .json({
        message: "User logged successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });


    } catch (error) {
        
    }
}

export const logoutUser=async (req,res)=>{
const token=req.cookies.token

if (token) {
  await tokenBlacklistModel.create({token})
}

res.clearCookie("token")
res.status(200).json({message:"User logged out successfully"})
}