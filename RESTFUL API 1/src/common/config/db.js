import mongoose from "mongoose";

const connectDB= async()=>{
    //DB connection may fail
    //DB is in another continent

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    
}

export default connectDB;