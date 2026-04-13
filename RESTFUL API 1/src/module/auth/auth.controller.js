import * as authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const register = async (req, res) => {
  const user = await authService.register(req.body);
  ApiResponse.created(res, "Registration success", user);
};
const login = async (req, res) => {
  // from authservice.login we can user, accessToken, refreshToken in return
  const { user, accessToken, refreshToken } = await authService.login(req.body);
  //npm i cookie-parser
  //where we need cookies in req / res => ans. res

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  ApiResponse.ok(res, "Login Successful", {user, accessToken})
};

const logout = async (req, res)=>{
    await authService.logout(req.user.id)
    res.clearCookie("refreshToken")
    ApiResponse.ok(res, "Logout Success");
}
const verifyEmail = async (req, res) => {
  await authService.verifyEmail(req.params.token);
  ApiResponse.ok(res, "Email verified successfully");
};

const getMe = async ( req, res) =>{
    const user = await authService.getMe(req.user.id);
    ApiResponse.ok(res, "User Profile", user);
}

export { register , login, logout, getMe, verifyEmail };
