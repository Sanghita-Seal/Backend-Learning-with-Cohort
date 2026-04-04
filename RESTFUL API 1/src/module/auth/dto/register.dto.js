import Joi, { required } from "joi";
import BaseDto from "../../../common/dto/base.dto";

class RegisterDto extends BAseDto{
    static schema = Ji.object({
        name: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string()
                     .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
                     .message("Must contain 8 chars minimum")
                     .min(8)
                    .required(),
        role: Joi.string().valid("customer", "seller", "admin").default("customer")
    })
}

export default RegisterDto