import captainModel from "../models/captain.model.js";
import rideModel from "../models/ride.model.js";
import {getDistanceAndTime } from "./map.services.js";
import crypto from "crypto";


export const getFareService = async (pickup, destination) => {
    if(!pickup || !destination){
        throw new Error("Pickup or destination not found");
    }

    const distanceTime = await getDistanceAndTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20
    }
    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 8
    }

    const perMinuteRate = {
        auto: 2,
        car: 3,
        bike: 1
    }
    const distance_km = distanceTime.distance_km;
    const duration_min = distanceTime.duration_min;
    if(distance_km < 0 || duration_min < 0){
        throw new Error("Distance or duration not found");
    }
    const fare = {
        auto: Math.round(baseFare.auto + (distance_km * perKmRate.auto) + (duration_min * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distance_km * perKmRate.car) + (duration_min * perMinuteRate.car)),
        bike: Math.round(baseFare.bike + (distance_km * perKmRate.bike) + (duration_min * perMinuteRate.bike))
    };
    return fare;
}

const getOtp =  (num)=>{
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
 }

export const createRideService = async ({user, pickup, destination, vehicleType}) => {
    const fare = await getFareService(pickup, destination);
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        vehicleType,
        fare: fare[vehicleType],
        otp: getOtp(6),
    });
    if(!ride){
        throw new Error("Ride not created");
    }
    return ride;
}

export const confirmRideService = async ({rideId, captain}) => {
    await rideModel.findOneAndUpdate({
        _id: rideId,
    },{
        status: "accepted",
        captain: captain._id
    })

    const ride = await  rideModel.findOne({
        _id: rideId,
    }).populate("user").populate("captain").select("+otp");
    if(!ride){
        throw new Error("Ride not found");
    }
     return ride;
}

export const startRideService = async ({rideId, otp, captain}) => {
    const ride = await rideModel.findOne({
        _id:rideId
    }).populate("user").populate("captain").select("+otp");

    if(ride.otp !== otp){
        throw new Error("Invalid OTP");
    }

    if(!ride.status === "accepted"){
        throw new Error("Ride not accepted");
    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:"ongoing"
    });
    await captainModel.findOneAndUpdate({
        _id:captain._id
    },{
        status:"active"
    });

    return ride
}

export const endRideService = async ({rideId, captain}) => {
    const ride = await rideModel.findOne({
        _id:rideId,
        captain: captain._id
    }).populate("user").populate("captain").select("+otp");
    if(!ride){
        throw new Error("Ride not found");
    }
    if(!ride.status === "ongoing"){
        throw new Error("Ride not ongoing");
    }
    await rideModel.findOneAndUpdate({
        _id:rideId
    },{
        status:"completed"
    });
    await captainModel.findOneAndUpdate({
        _id:captain._id
    },{
        status:"inactive"
    });
    ride.otp = "";
    return ride;
}