import captainModel from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.services.js";



export const registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }

        const {fullname, email, password, vehicles} = req.body;

        const isCaptainAlreadyExists = await captainModel.findOne({email});

        if(isCaptainAlreadyExists){
            return res.status(400).json({messaage: "Captain already exists"})
        }

        const hashedPassword  = await captainModel.hashPassword(password);
        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicles.color,
            plate: vehicles.plate,
            capacity: vehicles.capacity,
            vehicleType: vehicles.vehicleType
        })

        const token= captain.generateAuthToken();
        return res.status(201).json({token,captain})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}


export const loginCaptain = async (req, res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {email, password} = req.body;
        const captain = await captainModel.findOne({email}).select("+password");

        if(!captain){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isMatch = await captain.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token = captain.generateAuthToken();

        res.cookie("token", token);

        return res.status(200).json({captain, token});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const getCaptainProfile = async(req, res, next) =>{
    res.status(200).json({captain: req.captain})
}

export const logoutCaptain = async (req, res, next) =>{
    res.clearCookie("token")
    res.status(200).json({message: "logged out successfully"})
}