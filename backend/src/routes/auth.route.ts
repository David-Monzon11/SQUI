import express from "express";
import { register, login, getProfile, updateProfile } from "../controllers/auth.controller.js";
import { authenticateJwt } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateJwt, getProfile);
router.put("/profile", authenticateJwt, updateProfile);

export { router as authRouter };
