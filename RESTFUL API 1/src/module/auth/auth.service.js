const register = async ({name , email, password, role})=>{
    //do user registration
   const existing = await User.findOne({email});
   if(existing){
    throw new ApiError.conflict("Email already exists");
   }

   const { rawToken, hashedToken} = generateResetToken();

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken,
    });

    //send an email to the user with the rawToken 

    //deleted which u don't want to send
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.verificationToken;

    return userObject;
}
export default {register}