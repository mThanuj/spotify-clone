import express from "express";

const albumRouter = express.Router();

albumRouter.get("/", (req, res) => {
  res.send("Album route with GET method");
});

export default albumRouter;
