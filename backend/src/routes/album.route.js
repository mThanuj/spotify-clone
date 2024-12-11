import express from "express";
import { getAlbumById, getAllAlbums } from "../controllers/album.controller.js";

const albumRouter = express.Router();

albumRouter.get("/", getAllAlbums);
albumRouter.get("/:id", getAlbumById);

export default albumRouter;
