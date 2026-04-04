import "dotenv/config";
import app from "./src/app";
import { connect } from "mongoose";
const PORT = process.env.PORT || 5000;

const start = async()=>{
    //connect to DB
    await connectDB();
    app.listen ( PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
        
    })
}

start().catch((err)=>{
    console.error("Failed to satrt the server: ", err);
    process.exit(1);    
})