import captainModel from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.services.js";



export const registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:error.array()})
        }

        const {fullname, email, password, vehicle} = req.body;

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
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
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
            return res.status(400).json({errors:erros.array()})
        }

        const {email, password} = req.body;
        const captain = await captainModel.findOne({email});

        if(!captain){
            return res.status(400).json({messge:"Invalid credentials"})
        }

        const isMatch = await captain.comparePassword(password);

        if(!isMatch){
            return res.status(400).json({messaage:"Invalid credentials"})
        }

        const token = captain.generateAuthToken();

        res.cookie("token", captain);
    } catch (error) {
        console.log(eror)
        res.status(500).json({message: "Internal server error"})
    }
}