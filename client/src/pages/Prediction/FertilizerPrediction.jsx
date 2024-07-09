import axios from "axios";
// import { Sidebar } from "keep-react";
import { useState } from "react";
import ApiLoading from "../../components/ApiLoading";
import { Link } from "react-router-dom";
import NewProductCard from "../../components/NewProductCard";

import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import { Divider, Typography } from "@mui/material";

export default function FertilizerPrediction({ cart, setCart }) {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    temperature: "",
    humidity: "",
    moisture: "",
    soilType: "",
    cropType: "",
    nitrogen: "",
    potassium: "",
    phosphorus: "",
  });
  const [crop, setCrop] = useState("");
  const [fert, setFert] = useState(null);
  const [got, setGot] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputData({
  //     ...inputData,
  //     [name]: value,
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Custom validation for soilType
    if (name === "soilType" && (isNaN(value) || value < 0 || value > 4)) {
      return; // Do nothing if value is not a number between 0 and 4
    }

    // Custom validation for cropType
    if (name === "cropType" && (isNaN(value) || value < 0 || value > 10)) {
      return; // Do nothing if value is not a number between 0 and 10
    }

    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {
      temperature,
      humidity,
      moisture,
      soilType,
      cropType,
      nitrogen,
      potassium,
      phosphorus,
    } = inputData;
    try {
      // Make a GET request to the Node.js server's predict route
      const response = await axios.get(`/api/v1/crops/predictfertilizer`, {
        params: {
          data: [
            temperature,
            humidity,
            moisture,
            soilType,
            cropType,
            nitrogen,
            potassium,
            phosphorus,
          ].map(parseFloat),
        },
      });
      // Extract the prediction from the response and do something with it
      //console.log("Prediction:", response.data.prediction);
      setCrop(response.data.prediction);

      // Fire the search after the prediction arrives
      const searchResponse = await axios.get(
        `/api/v1/crops/search?name=${response.data.prediction[0]}`
      );
      //console.log("Search response: ", searchResponse.data.data.crop);
      setFert(searchResponse.data.data.crop);

      setGot(true);
    } catch (error) {
      console.error("Prediction Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="isolate bg-white px-6   lg:px-8">
        {loading && <ApiLoading />}
        {got ? (
          <>
            <div className="mx-auto max-w-2xl text-center">
              <p className="mt-2 text-lg leading-8 text-gray-600">
                You shoul use
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {crop}
              </h2>
              <hr />
            </div>
            {fert ? (
              <div className="mx-auto max-w-2xl text-center">
                <p className="mt-2 text-lg leading-8 text-gray-800 font-bold">
                  You can buy this product from our store!
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                  {Array.isArray(fert) ? (
                    fert.map((product) => (
                      <div
                        className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                        key={product._id}
                      >
                        <Link to={`/crops/${product._id}`}>
                          <NewProductCard
                            cart={cart}
                            cropid={product._id}
                            setCart={setCart}
                            name={product.name}
                            image={product.image}
                            type={product.type}
                            price={product.price}
                            description={product.description}
                            quantity={product.quantity}
                          />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div
                      className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                      key={fert._id}
                    >
                      <Link to={`/crops/${fert._id}`}>
                        <NewProductCard
                          cart={cart}
                          cropid={fert._id}
                          setCart={setCart}
                          name={fert.name}
                          image={fert.image}
                          type={fert.type}
                          price={fert.price}
                          description={fert.description}
                          quantity={fert.quantity}
                        />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <div className="flex flex-row gap-3">
              <div className="w-full">
                <div className="mx-auto max-w-2xl text-center">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Fertilizer Prediction !
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                      Enter your field properties
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="first-name"
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
                          humidity
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
                          moisture
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            id="moisture"
                            name="moisture"
                            value={inputData.moisture}
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
                          soilType
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            id="soilType"
                            name="soilType"
                            value={inputData.soilType}
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
                          cropType
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            id="cropType"
                            name="cropType"
                            value={inputData.cropType}
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
                          nitrogen
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            id="nitrogen"
                            name="nitrogen"
                            value={inputData.nitrogen}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          potassium
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            id="potassium"
                            name="potassium"
                            value={inputData.potassium}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          phosphorus
                        </label>
                        <div className="mt-2.5">
                          <input
                            type="text"
                            id="phosphorus"
                            name="phosphorus"
                            value={inputData.phosphorus}
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
                </div>
              </div>
              <div className="w-1/2">
                <Typography>
                  Please select the values from the following for the certain
                  fields
                </Typography>
                <Sheet>
                  <Table
                    borderAxis="xBetween"
                    color="neutral"
                    size="md"
                    stickyHeader
                    variant="plain"
                  >
                    <thead>
                      <tr>
                        <th>Soil Type</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Black</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Clayey</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Loamy</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>Red</td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <td>Sandy</td>
                        <td>4</td>
                      </tr>
                    </tbody>
                  </Table>
                </Sheet>
                <Divider className="p-4" />
                <Sheet
                  sx={{
                    "--TableCell-height": "40px",
                    // the number is the amount of the header rows.
                    "--TableHeader-height": "calc(1 * var(--TableCell-height))",
                    height: 200,
                    overflow: "auto",
                    background: (theme) =>
                      `linear-gradient(${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 50% 0,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 50% 100%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
                    backgroundSize:
                      "100% 40px, 100% 40px, 100% 14px, 100% 14px",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "local, local, scroll, scroll",
                    backgroundPosition:
                      "0 var(--TableHeader-height), 0 100%, 0 var(--TableHeader-height), 0 100%",
                    backgroundColor: "background.surface",
                  }}
                >
                  <Table
                    borderAxis="xBetween"
                    color="neutral"
                    size="md"
                    stickyHeader
                    variant="plain"
                  >
                    <thead>
                      <tr>
                        <th>Crop Type</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Barley</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Cotton</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Ground nut</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>Maize</td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <td>Millets</td>
                        <td>4</td>
                      </tr>

                      <tr>
                        <td>Oilseeds</td>
                        <td>5</td>
                      </tr>

                      <tr>
                        <td>Paddy</td>
                        <td>6</td>
                      </tr>

                      <tr>
                        <td>Pulses</td>
                        <td>7</td>
                      </tr>

                      <tr>
                        <td>Sugarcane</td>
                        <td>8</td>
                      </tr>

                      <tr>
                        <td>Tobacco</td>
                        <td>9</td>
                      </tr>

                      <tr>
                        <td>Wheat</td>
                        <td>10</td>
                      </tr>
                    </tbody>
                  </Table>
                </Sheet>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
