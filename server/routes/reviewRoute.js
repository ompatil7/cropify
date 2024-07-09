const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");
const axios = require("axios");
const router = express.Router({ mergeParams: true });

// router.use(authController.protect);
const FLASK_SERVER_URL = "http://127.0.0.1:5000/";
router
  .route("/")
  .get(reviewController.getallreview) // Only one route for getting all reviews
  .post(reviewController.setCropUserIds, reviewController.createReview);

router
  .route("/:id")
  .patch(reviewController.updateOne)
  .delete(reviewController.deleteOne);

router.get("/getratings", (req, res) => {
  axios
    .get(`${FLASK_SERVER_URL}/ratinggraph`)
    .then((response) => {
      // Extract the prediction from the response and send it back to the client
      // console.log("respons of prediction", response);
      //changed response obj
      const graphs = response.data;
      // console.log("got ", response.data);
      res.json({ graphs });
    })
    .catch((error) => {
      console.error("Graph Error:", error);
      res.status(500).json({ error: "Graph failed" });
    });
});

router.get("/randomreviews", reviewController.home);

module.exports = router;
