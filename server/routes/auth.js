import express from "express";
import { login } from "../controllers/auth.js";

// This will allows express to identify that all these routes will be configured
const router = express.Router();

router.post("/login", login);

export default router;
