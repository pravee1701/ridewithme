import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";

const app = express();
dotenv.config();

connectDB()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.json({message: "Welcome to the ridewithme backend api"});
})

// Going to implement our api route
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/captain", captainRoutes)

export default app;