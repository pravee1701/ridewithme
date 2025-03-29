import {validationResult} from "express-validator";
import userModel from "../models/user.model.js";
import { createUser } from "../services/user.services.js";

export const registerUser = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {fullname, email, password} = req.body;

        const isUserAlreadyExist = await userModel.findOne({email});
        if(isUserAlreadyExist){
            return res.status(400).json({message: "User already exist"})
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        })

        const token = user.generateAuthToken();

        res.status(201).json({user, token});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

export const loginUser = async(req, res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {email, password} = req.body;
        const user = await userModel.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        const isMatched = await user.comparePassword(password);

        if(!isMatched){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = user.generateAuthToken();

        res.cookie("token", token);

        return res.status(200).json({user, token});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

export const getUserProfile = async (req, res)=>{
     res.status(200).json(req.user);
}

export const logoutUser = async (req, res, next)=>{
    res.clearCookie("token");
    res.status(200).json({message: "Logged out successfully"})
}