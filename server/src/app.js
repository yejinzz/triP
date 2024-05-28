import "dotenv/config";
import express from "express";
import connectDB from "./db/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  verifyAccessToken,
  replaceAccessToken,
} from "./middlewares/verifyToken.js";
import authRouter from "./routes/authRoutes.js";
import placeRouter from "./routes/placeRoutes.js";
import planRouter from "./routes/planRoutes.js";
import userRouter from "./routes/userRoutes.js";
// CORS 사용

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://trip-yejinzz.vercel.app",
      "https://web-trip-client-85phb42blv09cyua.sel5.cloudtype.app",
    ],
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Router
app.use("/api/auth", authRouter);
app.use(verifyAccessToken, replaceAccessToken);
app.use("/api/user", userRouter);
app.use("/api/places", placeRouter);
app.use("/api/plan", planRouter);

const url = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(url)
  .then(() => {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
