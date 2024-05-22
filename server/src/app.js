require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const cors = require("cors");
// const server = require("http").createServer(app);
// const moodRouter = require("./routes/moodRoutes");
const authRouter = require("./routes/authRoutes");
const placeRouter = require("./routes/placeRoutes");
const planRouter = require("./routes/planRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const {
  verifyAccessToken,
  replaceAccessToken,
} = require("./middlewares/verifyToken");

// CORS 사용
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
