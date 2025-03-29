import captainModel from "../models/captain.model.js";


export const createCaptain = async ({firstname, lastname, email, password, color, plate, capacity, vehicleType}) =>{
    if(!firstname || !lastname || !email || !password || !color || 
        !plate || !capacity ||!vehicleType
    ){
        return res.status(400).json({message:"All fields are required"});
    }

    const captain = await captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicles:{
            color,
            plate,
            vehicleType,
            capacity
        }
    }) 

    return captain;
}