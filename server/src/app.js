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
} = require("./middlewares/verifyRefresh");

// CORS 사용
app.use(
  cors({
    origin: "http://localhost:5173",
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
// app.use("/api/mood", moodRouter);
app.use("/api/user", userRouter);
app.use("/api/places", placeRouter);
app.use("/api/plan", planRouter);

const url = process.env.DB_URL;
const port = process.env.PORT || 4000;

connectDB(url)
  .then(() => {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
