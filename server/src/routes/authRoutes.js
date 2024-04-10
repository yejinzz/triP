const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/authController");

router.post("/signup", authCtrl.localSignup);
router.post("/login", authCtrl.localLogin);
// router.get("/exists/:key(email|username)/:value", authCtrl.exists);deleteAccount
router.post("/logout", authCtrl.logout);

module.exports = router;
