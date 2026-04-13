import cookieParser from "cookie-parser";
import express from "express"
import authRoute from "./module/auth/auth.routes.js";

const app = express();
app.use(express.json()); //to handle json data
app.use(express.urlencoded({extended: true}));//to handle form data 
app.use(cookieParser()) // to handle cookies

app.use("/api/auth", authRoute);//localhost:5000/api/auth/ kuch bhi aayega to pass on it to authRoute 

export default app