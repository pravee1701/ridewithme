import { validationResult } from "express-validator";
import { getAddressCoordinates, getCaptainInTheRadius } from "../services/map.services.js";
import rideModel from "../models/ride.model.js";
import { confirmRideService, createRideService, endRideService, getFareService, startRideService } from "../services/rides.services.js";
import { sendMessageToSocketId } from "../socket.js";



export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    try {
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });
        if (!ride) {
            return res.status(400).json({ message: "Ride not created" });
        }
        
        const pickupCoordinates = await getAddressCoordinates(pickup);
        const captainsInRadius = await getCaptainInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2);
        
        ride.otp = "";
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("user")
        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: "newRide",
                data: rideWithUser,
                message: "New ride request",
            })
        })
        
        res.status(201).json({ ride });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Ride not created" });
    }
}

export const getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {pickup, destination} = req.body;
     try {
        const fare  = await getFareService(pickup, destination);

        res.status(200).json(fare);
     } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Fare not found" });
     }
}

export const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    if (!rideId) {
        return res.status(400).json({ message: "Ride id is required" });
    }
    if(!req.captain) {
        return res.status(400).json({ message: "Captain id is required" });
    }
    try {
        const ride = await confirmRideService({rideId, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: "newRide",
            data: ride,
            message: "New ride request",
        })

        return res.status(200).json(ride);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Ride not confirmed" });
    }
}

export const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startRideService({rideId, otp, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: "rideStarted",
            data: ride,
            message: "Ride started",
        })

        return res.status(200).json(ride);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Ride not started" });
    }

}
export const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.query;

    try {
        const ride = await endRideService({rideId, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: "rideEnded",
            data: ride,
            message: "Ride ended",
        })
        return res.status(200).json(ride);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Ride not ended" });
    }
}