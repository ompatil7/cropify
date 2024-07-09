const mongoose = require("mongoose");

const express = require("express");

const authController = require("../controllers/authController");

const storeController = require("../controllers/storeController");

const router = express.Router();

router
  .route("/")
  .post(storeController.createStore)
  .get(storeController.getallstore);

router
  .route("/:id")
  .patch(storeController.updateStore)
  .delete(storeController.deleteStore);

module.exports = router;
