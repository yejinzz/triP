// const express = require("express");
import express from "express";
import {
  localSignup,
  localLogin,
  logout,
} from "../controller/authController.js";
// const authCtrl = require("../controller/authController");

const router = express.Router();
router.post("/signup", localSignup);
router.post("/login", localLogin);
// router.get("/exists/:key(email|username)/:value", exists);deleteAccount
router.post("/logout", logout);

export default router;
