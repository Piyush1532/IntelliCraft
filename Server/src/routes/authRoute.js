import express from "express"
import { loginUser, registerUser } from "../controllers/authController.js"

const authRouter=express.Router()

// register a new user 
authRouter.post("/register",registerUser)

// login a user through email and password
authRouter.post("/login",loginUser)

export default authRouter