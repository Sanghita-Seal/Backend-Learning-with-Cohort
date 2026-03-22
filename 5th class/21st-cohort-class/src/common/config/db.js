import mongoose from "mongoose";


const connectDB = async () => {
    //console.log(process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    //what is inside this conn
    console.log(`MongoDB connected: ${conn.connection.host}`)
}

export default connectDB