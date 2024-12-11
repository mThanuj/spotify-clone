import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("User route with GET method");
});

export default userRouter;
