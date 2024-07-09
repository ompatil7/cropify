const express = require("express");

const emailController = require("./../controllers/emailController");

const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/subscribe", emailController.subscribe);
router.use(authController.protect);
router.get(
  "/",
  authController.restrictTo("admin"),
  emailController.getAllSubscribe
);

module.exports = router;
