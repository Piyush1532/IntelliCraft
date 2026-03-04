import mongoose from "mongoose"

const connectToDB=async () => {
    try {
mongoose.connection.on("connected",()=>console.log("Database connected success"))

    await mongoose.connect(`${process.env.MONGO_URI}`)    

    } catch (error) {
        console.log(error.message)
    }
}
export default connectToDB