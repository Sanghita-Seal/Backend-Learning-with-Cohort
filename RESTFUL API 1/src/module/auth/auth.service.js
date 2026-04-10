import ApiError from "../../common/utils/api-error.js";
import {
  generateAccessToken,
  generateResetToken,
  generateRefreshToken,
} from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";

//2
const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

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

  if (!user.isVerified) {
    throw ApiError.forbidden("Please verify your email before login");
  }

  //generate access & refresh token
  const accessToken = generateAccessToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });

  //3
  user.refreshToken = hashToken(refreshToken); // We are doing it in copy
  //4 save in DB
  await user.save({validateBeforeSave: false}) // otherwise mongoose will validate all data again

  const userObj = user.toObject()
  delete userObj.password
  delete userObj.refreshToken

  return {user: userObj, accessToken, refreshToken  }
};

export { register };
