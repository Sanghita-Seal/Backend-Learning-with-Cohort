import ApiError from "../../common/utils/api-error";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";

import User from "./auth.model.js";

const authenticate = async (req, res, next) => {
  //get the token
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  //if you sent token in cookies...then insted of headers use cookies
  // for that u need to install cookie-parser

  if (!token) throw ApiError.unauthorised("not authenticated");

  const decoded = verifyAccessToken(token);
  const user = await User.findById(decoded.id)
  if(!user) throw ApiError.unauthorised("User doesn't exist")

    //add some data in req
    req.user = {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
    };
    next();
};

const authorize = (...roles)=>{
    return (req, res, next )=>{
        if(!roles.includes(req.user.role)){
            throw ApiError.forbidden("You do not have permission to perform this action", );
        }
        next();
    }
}
export { authenticate, authorize };
