import express from 'express';
import { authUser, authCaptain } from "../middleware/auth.middleware.js";
import { confirmRideValidator, createRideValidator, getFareValidator, startRideValidator } from '../validators/ride.validator.js';
import { confirmRide, createRide, endRide, getFare, startRide } from '../controllers/rides.controller.js';

const router = express.Router();

router.post("/create", authUser, createRideValidator,createRide
);

router.get("/get-fare", authUser, getFareValidator, getFare);

router.post("/confirm", authCaptain, confirmRideValidator, confirmRide);

router.get("/start-ride", authCaptain, startRideValidator, startRide);

router.get("/end-ride", authCaptain, endRide);

export default router;