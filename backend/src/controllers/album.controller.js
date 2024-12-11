import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();

    res.status(200).json(albums);
  } catch (err) {
    next(err);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const album = await Album.findById(id).populate("songs");

    if (!album) {
      return res.status(404).json({
        success: false,
        message: `Album not found`,
      });
    }

    res.status(200).json(album);
  } catch (err) {
    next(arr);
  }
};
