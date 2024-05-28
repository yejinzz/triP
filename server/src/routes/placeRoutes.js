// const express = require("express");
import express from "express";
import {
  crawlPlaceInfoByRegion,
  getPlaceInfoByRegion,
  getSearchPlace,
  getPlaceDetails,
} from "../controller/placeController.js";
// const placeCtrl = require("../controller/placeController");

const router = express.Router();

router.route("/").post(crawlPlaceInfoByRegion).get(getPlaceInfoByRegion);
router.get("/:contentId", getSearchPlace);
router.get("/details/:contentId", getPlaceDetails);

export default router;
