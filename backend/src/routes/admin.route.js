import express from "express";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";

const adminRouter = express.Router();

adminRouter.use(protectRoute, requireAdmin);

adminRouter.get("/check", checkAdmin);

adminRouter.post("/songs", createSong);
adminRouter.delete("/songs/:id", deleteSong);

adminRouter.post("/albums", createAlbum);
adminRouter.delete("/albums/:id", deleteAlbum);

export default adminRouter;
