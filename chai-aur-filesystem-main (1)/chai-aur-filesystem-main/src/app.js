import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./modules/auth/auth.routes.js";
import ApiError from "./common/utils/api-error.js";
import errorHandler from "./common/middleware/error.middleware.js";
import multer from "multer";
import ApiResponse from "./common/utils/api-response.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

// const storage = multer.memoryStorage();


const upload = multer({
  storage ,  
  limits:{
  fileSize:1024 * 1024 * 2 //2mb 
},
fileFilter:(req , file , cb)=>{
  const allowed = ["image/png" , "image/jpeg" , "application/pdf"]

  if(allowed.includes(file.mimetype)){
    cb(null ,true )
  }
  else{
    cb(new Error("File type not supported") ,false)
  }
}
});














app.use("/api/auth", authRoute);

app.all("{*path}", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

app.use(errorHandler);

export default app;
