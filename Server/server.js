import "dotenv/config"

import app from "./src/app.js"
import connectToDB from "./src/config/database.js"

await connectToDB()

app.listen(3000,()=>{
    console.log("Server started")
})