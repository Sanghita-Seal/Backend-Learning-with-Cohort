import mongoose from "mongoose";
//1
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLenngth: 2,
      maxLength: 50,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: trusted,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 0,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
      type: String,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true },
);

//2
userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();
    
    //if password is modified
    this.password = await bcrypt.hash(this.password, 12);
    next();  
});
//3
userSchema.methods.comparePassword = async function(clearTextPassword){
    return await bcrypt.compare(clearTextPassword, this.password)
}

export default mongoose.model("User", userSchema);
