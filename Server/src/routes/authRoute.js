import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/authController.js"

const authRouter=express.Router()

// register a new user 
authRouter.post("/register",registerUser)

// login a user through email and password
authRouter.post("/login",loginUser)

// clear token from user cookie and add the token in the blacklist
authRouter.get("/logout",logoutUser)

export default authRouter