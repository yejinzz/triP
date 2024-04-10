const express = require("express");
const router = express.Router();
const planCtrl = require("../controller/planController");

router.route("/").get(planCtrl.getAllPlan).post(planCtrl.createPlan);
// router.route("/:planId").patch(planCtrl.getPlan);
router
  .route("/:planId")
  .get(planCtrl.getPlan)
  .patch(planCtrl.patchPlan)
  .delete(planCtrl.deletePlan);

// router.route("/:planId").delete(planCtrl.deletePlan);
module.exports = router;
