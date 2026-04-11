import { Router } from "express";
import * as controller from "./auth.controller.js"
import validate from "../../common/middlewares/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import { authenticate } from "./auth.middleware.js";
import loginDto from "./dto/login.dto.js";

const router= Router();

router.post("/register", validate(RegisterDto), controller.register );

router.post("/login", validate(loginDto), controller.login);
router.get("/me", authenticate, controller.getMe);


export default router