import jwt from "jsonwebtoken"
import tokenBlacklistModel from "../models/blackListModel.js"

export const authUser=async (req,res,next) => {
   const token=req.cookies.token
   
   if (!token) {
    return res.status(401).json({message:"Token not provided"})
   }

const isTokenBlackListed=await tokenBlacklistModel.findOne({
   token     
})

if(isTokenBlackListed){
      return res.status(401).json({message:"Token is invalid"})
}
   
   try {
    const decoded= jwt.verify(token,process.env.JWT_SECRET)
    req.user=decoded
    next()
} catch (error) {
        return res.status(401).json({message:"Token is invalid"})
}

}