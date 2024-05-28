// const express = require("express");
import express from "express";
import {
  getAllPlan,
  createPlan,
  getPlan,
  patchPlan,
  deletePlan,
} from "../controller/planController.js";
// const planCtrl = require("../controller/planController");

const router = express.Router();
router.route("/").get(getAllPlan).post(createPlan);
// router.route("/:planId").patch(getPlan);
router.route("/:planId").get(getPlan).patch(patchPlan).delete(deletePlan);

// router.route("/:planId").delete(planCtrl.deletePlan);
export default router;
