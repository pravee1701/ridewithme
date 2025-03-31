import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new Schema({
    fullname:{
        firstname:{
            type:String,
            required: true,
            minLength: [3, "Firstname should be atleast 3 character long"],
        },
        lastname:{
            type: String,
            minLength:[3, "Lastname should atleast 3 character long "]
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: [5, "Email should be atleast 5 character long"],
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"],
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    vehicles:{
        color:{
            type: String,
            required: true,
            minLength:[3, "Color should be atleast 3 character long"]
        },
        plate:{
            type: String,
            required: true,
            minLength: [3, "Plate should be atleast 3 character long"]
        },
        capacity:{
            type: Number,
            required: true,
            minLength:[1, "Capacity should be atleast 1 member"]
        },
        vehicleType:{
            type:String,
            required: true,
            enum:["car", "bike", "auto"]
        },
    },
    location:{
        ltd:{
            type: Number,
        },
        lng:{
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn: "24h"});
    return token;
}

captainSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model("captain",captainSchema);

export default captainModel;