import {body, query} from "express-validator";

export const createRideValidator  = [
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
    body("vehicleType").isString().isIn(["car", "bike", "auto"]).withMessage("Invalid vehicle type")
]

export const getFareValidator = [
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address")
]

export const confirmRideValidator = [
    body("rideId").isMongoId().withMessage("Invalid ride id"),
]

export const startRideValidator = [
    query("rideId").isMongoId().withMessage("Invalid ride id"),
    query("otp").isString().isLength({min: 6, max: 6}).withMessage("Invalid otp"),
]

export const endRideValidator = [
    body("rideId").isMongoId().withMessage("Invalid ride id"),
]