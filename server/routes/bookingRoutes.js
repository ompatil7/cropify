const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

const router = express.Router();
router.get("/bookingstat", bookingController.getbookingstats);
router.get("/getallbooking", bookingController.getallbookings);
router.get("/report", bookingController.createreport);
// router.get("/:id", bookingController.getsinglebooking);
router.use(authController.protect);

router.get("/checkout-session/:id", bookingController.getCheckoutSession);
router.get("/booking", bookingController.createBookingCheckout);
router.get("/mypurchase", bookingController.mypurchase);
router.get("/checkoutforcart", bookingController.createCheckoutSessionForCart);
router.get("/cart", bookingController.createBookingCheckoutcart);
module.exports = router;
