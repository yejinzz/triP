import express from "express";
import {
  getUserInfo,
  patchUserInfo,
  deleteUser,
} from "../controller/userController.js";
// const userCtrl = require("../controller/userController");
// const { userAuthentication } = require("../middlewares/userAuthentication");
import userAuthentication from "../middlewares/userAuthentication.js";

const router = express.Router();
router.get("/", userAuthentication, getUserInfo);
router.patch("/:id", userAuthentication, patchUserInfo);
router.delete("/", userAuthentication, deleteUser);

export default router;
