const express = require("express");
const router = express.Router();
const placeCtrl = require("../controller/placeController");

router
  .route("/")
  .post(placeCtrl.crawlPlaceInfoByRegion)
  .get(placeCtrl.getPlaceInfoByRegion);

router.get("/:contentId", placeCtrl.getSearchPlace);
router.get("/details/:contentId", placeCtrl.getPlaceDetails);

module.exports = router;
