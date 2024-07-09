import axios from "axios";
import { useState } from "react";
import ApiLoading from "../../components/ApiLoading";

import Card from "@mui/joy/Card";

import Divider from "@mui/joy/Divider";

import Typography from "@mui/joy/Typography";

export default function AdvicePrediction() {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    pH: "",
    rainfall: "",
  });
  const [prediction, setPrediction] = useState({});
  const [got2, setGot2] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmitSecond = (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Prediction Error:", error);
        setLoading(false);
      });
  };

  return (
    <div className="h-screen overflow-y-auto">
      <>
        <div className="isolate bg-white px-6   lg:px-8">
          {loading && <ApiLoading />}
          {got2 ? (
            <>
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-1xl font-normal tracking-tight text-gray-700 sm:text-3xl mb-4">
                  You should grow -{" "}
                  <span className="text-3xl font-bold text-gray-900 sm:text-3xl mb-4">
                    {" "}
                    {prediction.prediction}
                  </span>
                </h2>
                <Typography>
                  Please Consider the following changes in your soil
                </Typography>
                {/* <p className="mt-2 text-lg leading-8 text-gray-600">
                  {prediction.n_desc}
                </p>
                <hr />
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  {prediction.p_desc}
                </p>
                <hr />
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  {prediction.k_desc}
                </p> */}
                <div className="flex flex-col gap-5">
                  <Card size="md" variant="outlined">
                    {/* <Chip size="sm" variant="outlined" color="neutral">
                      BASIC
                    </Chip> */}
                    <Typography level="h3">Nitrogen</Typography>
                    <Divider inset="none" />
                    <Typography>{prediction.n_desc}</Typography>
                  </Card>
                  <Card size="md" variant="outlined">
                    {/* <Chip size="sm" variant="outlined" color="neutral">
                      BASIC
                    </Chip> */}
                    <Typography level="h3">Phosphorus</Typography>
                    <Divider inset="none" />
                    <Typography>{prediction.p_desc}</Typography>
                  </Card>
                  <Card size="md" variant="outlined">
                    {/* <Chip size="sm" variant="outlined" color="neutral">
                      BASIC
                    </Chip> */}
                    <Typography level="h3">Potassium</Typography>
                    <Divider inset="none" />
                    <Typography>{prediction.k_desc}</Typography>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Crop Prediction with Advice !
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Enter your field properties
                </p>
              </div>

              <form
                className="mx-auto mt-2 max-w-xl sm:mt-20"
                onSubmit={handleSubmitSecond}
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      N
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        id="N"
                        name="N"
                        value={inputData.N}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      P
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        id="P"
                        name="P"
                        value={inputData.P}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      K
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        id="K"
                        name="K"
                        value={inputData.K}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Temperature
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        id="temperature"
                        name="temperature"
                        value={inputData.temperature}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Humidity
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        id="humidity"
                        name="humidity"
                        value={inputData.humidity}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      pH
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        id="pH"
                        name="pH"
                        value={inputData.pH}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Rainfall
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        id="rainfall"
                        name="rainfall"
                        value={inputData.rainfall}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Let's predict
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </>
    </div>
  );
}
