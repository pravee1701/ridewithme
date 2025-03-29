import express from "express";
import {authCaptain} from "../middleware/auth.middleware.js";
import { loginValidator, registerValidator } from "../validators/captain.validator.js";
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from "../controllers/captain.controller.js";


const router = express.Router();

router.post("/register", registerValidator, registerCaptain)
router.post("/login", loginValidator, loginCaptain)
router.get("/profile", authCaptain, getCaptainProfile)
router.get("/logout", authCaptain, logoutCaptain)

export default router;