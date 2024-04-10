const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/userController");
const { userAuthentication } = require("../middlewares/userAuthentication");

router.get("/", userAuthentication, userCtrl.getUserInfo);
router.patch("/:id", userAuthentication, userCtrl.patchUserInfo);
router.delete("/", userAuthentication, userCtrl.deleteUser);

module.exports = router;
