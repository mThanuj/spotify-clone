import express from "express";

const statsRouter = express.Router();

statsRouter.get("/", (req, res) => {
  res.send("Stats route with GET method");
});

export default statsRouter;
