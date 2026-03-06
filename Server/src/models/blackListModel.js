import mongoose from "mongoose";

const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
         required:[true,"Token is required to be blacklisted"]
    }
},{timestamps:true})

const tokenBlacklistModel=mongoose.model("blacklist",blacklistTokenSchema)

export default tokenBlacklistModel