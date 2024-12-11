import express from "express";

const songRouter = express.Router();

songRouter.get("/", (req, res) => {
  res.send("Song route with GET method");
});

export default songRouter;
