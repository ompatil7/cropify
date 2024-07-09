const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

router.post(
  "/addToCart/:cropId",
  authController.protect,
  bookingController.addToCart
);

router.get("/mycart", authController.protect, bookingController.myCart);
router.delete(
  "/:cropId",
  authController.protect,
  bookingController.deleteFromCart
);
module.exports = router;
