import { body } from "express-validator";

export const registerValidator = [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("Firstname should be atleast 3 character long"),
    body("password").isLength({ min: 6 }).withMessage("Password should be alleast 6 character long"),
    body("vehicles.color").isLength({ min: 3 }).withMessage("Color must be 3 character long"),
    body("vehicles.plate").isLength({ min: 3 }).withMessage("PLate must be 3 character long"),
    body("vehicles.capacity").isInt({ min: 1 }).withMessage("Capacity must be atleast 1"),
    body("vehicles.vehicleType").isIn(['car', 'bike', 'auto']).withMessage("Invalid vehicles type"),
]

export const loginValidator = [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password should be atleast 6 character long")
]