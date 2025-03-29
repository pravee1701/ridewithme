import {body} from "express-validator";

export const registerValidator = [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname").isLength({min:3}).withMessage("Firstname should be atleast 3 character long"),
    body("password").isLength({min:6}).withMessage("Password should be alleast 6 character long"),
    body("vehicle.color").isLength({min:3}).withMessage("Color must be 3 character long"),
    body("vehicle.plate").isLength({min:3}).withMessage("PLate must be 3 character long"),
    body("vehicle.capacity").isLength({min:3}).withMessage("Capacity must be atleast 1"),
    body("vehicle.vehicleType").isIn(['car', 'motorcycle', 'auto']).withMessage("Invalid vehicle type"),
]

export const loginValidator = [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password should be atleast 6 character long")
]