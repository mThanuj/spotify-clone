import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (err) {
    console.error(`Error in uploadToCloudinary: ${err}`);
    throw new Error(`Error uploading to cloudinary`);
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({
        success: false,
        message: `Please upload all files`,
      });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumID: albumId || null,
    });

    await song.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: {
          songs: song._id,
        },
      });
    }

    res.status(201).json({
      success: true,
      song,
    });
  } catch (err) {
    console.error(`Error in createSong: ${err}`);
    next(err);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (song.albumID) {
      await Album.findByIdAndUpdate(song.albumID, {
        $pull: {
          songs: song._id,
        },
      });
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Song deleted successfully`,
    });
  } catch (err) {
    console.error(`Error in deleteSong: ${err}`);
    next(err);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();

    res.status(200).json({
      success: true,
      album,
    });
  } catch (err) {
    console.error(`Error in createAlbum: ${err}`);
    next(err);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Song.deleteMany({ albumID: id });
    await Album.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Album deleted successfully`,
    });
  } catch (err) {
    console.error(`Error in deleteAlbum: ${err}`);
    next(err);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({
    admin: true,
  });
};
