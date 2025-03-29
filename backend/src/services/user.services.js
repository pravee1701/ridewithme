import userModel from "../models/user.model.js";

export const createUser = async ({firstname, lastname, email, password}) =>{
    if(!firstname || !email || !password){
        throw new Error("Firstname email and Password is required")
    }

    const user = await userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}