import express from "express";
import { authCallback } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/callback", authCallback);

export default authRouter;
