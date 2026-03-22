import mongoose from "mongoose"

 const connectDB= async ()=>{
    //DB connect may fail -> try catch
    //DB is in another continent

    await mongoose.connect(process.env.MONGODB_URI);
    //let's see what's inside this connection
    console.log(`MongoDB connected: ${conn.connection.host} `);
    }

export default connectDB