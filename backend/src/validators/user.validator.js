import {body} from "express-validator";

export const registerValidator = [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname").isLength({min:3}).withMessage("Firstname should be atleast 3 character long"),
    body("password").isLength({min:6}).withMessage("Password should be alleast 6 character long")
]

export const loginValidator = [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password should be atleast 6 character long")
]