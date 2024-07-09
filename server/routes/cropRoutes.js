const express = require("express");
const axios = require("axios");
const cropController = require("./../controllers/cropController");

const authController = require("./../controllers/authController");
const router = express.Router();

const FLASK_SERVER_URL = "http://127.0.0.1:5000/"; // Replace 'flask-server-url' with the actual URL of your Flask server

// Define the route for predicting crops
router.get("/predict", (req, res) => {
  // Extract input data from query parameters or request body
  // const inputData = req.query.data; // Assuming data for prediction is sent in the query string
  const inputData = req.query.data.map(parseFloat);
  // Make a POST request to the Flask server's prediction endpoint
  axios
    .post(`${FLASK_SERVER_URL}/predict_crop`, {
      data: inputData,
    })
    .then((response) => {
      // Extract the prediction from the response and send it back to the client
      // console.log("respons of prediction", response);
      //changed response obj
      const prediction = response.data;
      res.json({ prediction });
    })
    .catch((error) => {
      console.error("Prediction Error:", error);
      res.status(500).json({ error: "Prediction failed" });
    });
});
router.get("/predictfertilizer", (req, res) => {
  // Extract input data from query parameters or request body
  const inputData = req.query.data.map(parseFloat); // Assuming data for prediction is sent in the query string

  // Make a POST request to the Flask server's prediction endpoint
  axios
    .post(`${FLASK_SERVER_URL}/predict_fertilizer`, {
      data: inputData,
    })
    .then((response) => {
      // Extract the prediction from the response and send it back to the client
      const prediction = response.data.prediction;
      res.json({ prediction });
    })
    .catch((error) => {
      console.error("Prediction Error:", error);
      res.status(500).json({ error: "Prediction failed" });
    });
});

//single
router.get("/singlecrop", (req, res) => {
  // Extract input data from query parameters or request body
  // const inputData = req.query.data; // Assuming data for prediction is sent in the query string
  const inputData = req.query.data.map(parseFloat);
  // Make a POST request to the Flask server's prediction endpoint
  axios
    .post(`${FLASK_SERVER_URL}/singlecrop`, {
      data: inputData,
    })
    .then((response) => {
      // Extract the prediction from the response and send it back to the client
      // console.log("respons of prediction", response);
      //changed response obj
      const prediction = response.data;
      res.json({ prediction });
    })
    .catch((error) => {
      console.error("Prediction Error:", error);
      res.status(500).json({ error: "Prediction failed" });
    });
});
router.get("/popular", (req, res) => {
  axios
    .get(`${FLASK_SERVER_URL}/popular`)
    .then((response) => {
      const graphs = response.data;
      // console.log("got ", response.data);
      res.json({ graphs });
    })
    .catch((error) => {
      console.error("Graph Error:", error);
      res.status(500).json({ error: "Graph failed" });
    });
});
router.get("/getratings", (req, res) => {
  // Extract input data from query parameters or request body
  // const inputData = req.query.data; // Assuming data for prediction is sent in the query string
  // const inputData = req.query.data.map(parseFloat);
  // Make a POST request to the Flask server's prediction endpoint
  axios
    .get(`${FLASK_SERVER_URL}/ratings`)
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

router.get("/search", cropController.searchcrop);
router
  .route("/")
  .post(
    cropController.uploadimage,
    cropController.resizeProductImage,
    cropController.createCrop
  )
  .get(cropController.getCrop);

router
  .route("/:id")
  .get(cropController.getsinglecrop)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    cropController.uploadimage,
    cropController.resizeProductImage,
    cropController.updatecrop
  )
  .delete(cropController.deleteCrop);

module.exports = router;
