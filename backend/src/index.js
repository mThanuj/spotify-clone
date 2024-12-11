import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import songRouter from "./routes/song.route.js";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";
import albumRouter from "./routes/album.route.js";
import statsRouter from "./routes/stat.route.js";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/songs", songRouter);
app.use("/api/albums", albumRouter);
app.use("/api/stats", statsRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});
