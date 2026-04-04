import mongoose from "mongoose";

const connectDB= async()=>{
    //DB connection may fail
    //DB is in another continent

    await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${connectDB.connection.host}`);

    
}

export default connectDB;