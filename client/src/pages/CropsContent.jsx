import React, { useState } from "react";
import axios from "axios";

const CropsContent = () => {
  const [inputData, setInputData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    pH: "",
    rainfall: "",
  });
  const [crop, setCrop] = useState("");
  const [prediction, setPrediction] = useState({});
  const [got, setGot] = useState(false);
  const [got2, setGot2] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { N, P, K, temperature, humidity, pH, rainfall } = inputData;
    // Make a GET request to the Node.js server's predict route
    axios
      .get(`/api/v1/crops/singlecrop`, {
        params: {
          data: [N, P, K, temperature, humidity, pH, rainfall].map(parseFloat),
        },
      })
      .then((response) => {
        // Extract the prediction from the response and do something with it
        //console.log("Prediction:", response.data.prediction.prediction);
        // setPrediction(response.data.prediction);
        setCrop(response.data.prediction.prediction);
        setGot(true);
      })
      .catch((error) => {
        console.error("Prediction Error:", error);
      });
  };
  const handleSubmitSecond = (e) => {
    e.preventDefault();
    const { N, P, K, temperature, humidity, pH, rainfall } = inputData;
    // Make a GET request to the Node.js server's predict route
    axios
      .get(`/api/v1/crops/predict`, {
        params: {
          data: [N, P, K, temperature, humidity, pH, rainfall].map(parseFloat),
        },
      })
      .then((response) => {
        // Extract the prediction from the response and do something with it
        //console.log("Prediction:", response.data.prediction);
        // setPrediction(response.data.prediction);
        setPrediction(response.data.prediction);
        setGot2(true);
      })
      .catch((error) => {
        console.error("Prediction Error:", error);
      });
  };

  return (
    <div>
      <h2>Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="N">N:</label>
        <input
          type="text"
          id="N"
          name="N"
          value={inputData.N}
          onChange={handleChange}
          className="border border-solid-gray"
        />
        <label htmlFor="P">P:</label>
        <input
          type="text"
          id="P"
          name="P"
          value={inputData.P}
          onChange={handleChange}
        />
        <label htmlFor="K">K:</label>
        <input
          type="text"
          id="K"
          name="K"
          value={inputData.K}
          onChange={handleChange}
        />
        <label htmlFor="temperature">Temperature:</label>
        <input
          type="text"
          id="temperature"
          name="temperature"
          value={inputData.temperature}
          onChange={handleChange}
        />
        <label htmlFor="humidity">Humidity:</label>
        <input
          type="text"
          id="humidity"
          name="humidity"
          value={inputData.humidity}
          onChange={handleChange}
        />
        <label htmlFor="pH">pH:</label>
        <input
          type="text"
          id="pH"
          name="pH"
          value={inputData.pH}
          onChange={handleChange}
        />
        <label htmlFor="rainfall">Rainfall:</label>
        <input
          type="text"
          id="rainfall"
          name="rainfall"
          value={inputData.rainfall}
          onChange={handleChange}
        />
        <button type="submit">Predict</button>
      </form>
      <hr />
      <h1>second</h1>
      <form onSubmit={handleSubmitSecond}>
        <label htmlFor="N">N:</label>
        <input
          type="text"
          id="N"
          name="N"
          value={inputData.N}
          onChange={handleChange}
          className="border border-solid-gray"
        />
        <label htmlFor="P">P:</label>
        <input
          type="text"
          id="P"
          name="P"
          value={inputData.P}
          onChange={handleChange}
        />
        <label htmlFor="K">K:</label>
        <input
          type="text"
          id="K"
          name="K"
          value={inputData.K}
          onChange={handleChange}
        />
        <label htmlFor="temperature">Temperature:</label>
        <input
          type="text"
          id="temperature"
          name="temperature"
          value={inputData.temperature}
          onChange={handleChange}
        />
        <label htmlFor="humidity">Humidity:</label>
        <input
          type="text"
          id="humidity"
          name="humidity"
          value={inputData.humidity}
          onChange={handleChange}
        />
        <label htmlFor="pH">pH:</label>
        <input
          type="text"
          id="pH"
          name="pH"
          value={inputData.pH}
          onChange={handleChange}
        />
        <label htmlFor="rainfall">Rainfall:</label>
        <input
          type="text"
          id="rainfall"
          name="rainfall"
          value={inputData.rainfall}
          onChange={handleChange}
        />
        <button type="submit">Predict</button>
      </form>

      {got && (
        <>
          <h1>Prediction Result</h1>
          <p>Prediction: {crop}</p>
          {/* <p>Prediction: {prediction.prediction}</p>
          <p>N Description: {prediction.n_desc}</p>
          <p>P Description: {prediction.p_desc}</p>
          <p>K Description: {prediction.k_desc}</p> */}
        </>
      )}
      {got2 && (
        <>
          <h1>Prediction Result</h1>

          <p>Prediction 2 : {prediction.prediction}</p>
          <p>N Description: {prediction.n_desc}</p>
          <p>P Description: {prediction.p_desc}</p>
          <p>K Description: {prediction.k_desc}</p>
        </>
      )}
    </div>
  );
};

export default CropsContent;
