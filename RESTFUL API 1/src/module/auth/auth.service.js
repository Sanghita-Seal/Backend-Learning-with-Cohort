import ApiError from "../../common/utils/api-error.js";
import {
  generateAccessToken,
  generateResetToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";

//2
const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const register = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) throw ApiError.conflict("Email already exisits");

  const { rawToken, hashedToken } = generateResetToken();

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

  // TODO: send an email to user with token: rawToken

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.verificationToken;

  return userObj;
};

//1
const login = async ({ email, password }) => {
  //take email and find user in DB
  //check if password is correct
  //check if verified or not

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw ApiError.unauthorised("Invalid email or password");

  //somehow I will check password
  const isMatch = await user.comparePassword(password);
  if(!isMatch) throw ApiError.unauthorised("Invalid email or password")

  if (!user.isVerified) {
    throw ApiError.forbidden("Please verify your email before login");
  }

  //generate access & refresh token
  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  //3
  user.refreshToken = hashToken(refreshToken); // We are doing it in copy
  //4 save in DB
  await user.save({ validateBeforeSave: false }); // otherwise mongoose will validate all data again

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

//5
const refresh = async (token) => {
  if (!token) throw ApiError.unauthorised("Refresh Token missing");
  const decoded = verifyRefreshToken(token);

  const user = await User.findById(decoded.id).select("+refreshToken");
  if (!user) throw ApiError.unauthorised("User not found");

  if (user.refreshToken !== hashToken(token))
    throw ApiError.unauthorised("Invalid Refresh Token");

  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
  user.refreshToken = hashToken(refreshToken); // We are doing it in copy
  //4 save in DB
  await user.save({ validateBeforeSave: false }); // otherwise mongoose will validate all data again

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  retrun({ accessToken });
};

//to log out I can only delete the refresh token form the DB, still user can access untill the access Token is expired
const logout = async (userId) => {
  // const user = await User.findById(userId);
  // if(!user) throw ApiError.unauthorised("User not found");

  // user.refreshToken = undefined;
  // await user.save({validateBeforeSave: false})

  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw ApiError.notfound("No account with that email");

  const { rawToken, hashedToken } = generateResetToken;
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  //TODO : mail bhejna nhi aata
};

const resetPassword = async (email) => {
  //- take token from user
  // - verify from DB
  // - take new password from user
  // - update password in the Db

  
};

export { register, login, refresh, logout, forgotPassword };
