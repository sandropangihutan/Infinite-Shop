import express from "express";
import { Login, logOut, Me, updateProfile } from "../controllers/Auth.js";

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);
router.patch("/updateProfile", updateProfile);
export default router;