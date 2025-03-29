import express from "express";
import {authUser} from "../middleware/auth.middleware.js";
import { loginValidator, registerValidator } from "../validators/captain.validator.js";
import { loginCaptain, registerCaptain } from "../controllers/captain.controller.js";


const router = express.Router();

router.post("/register", registerValidator, registerCaptain)
router.post("/login", loginValidator, loginCaptain)
router.get("/profile")
router.get("/logout")

export default router;