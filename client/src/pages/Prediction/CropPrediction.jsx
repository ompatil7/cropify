import axios from "axios";
// import { Sidebar } from "keep-react";
import { useState } from "react";
import ApiLoading from "../../components/ApiLoading";
import NewProductCard from "../../components/NewProductCard";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export default function CropPrediction({ cart, setCart }) {
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
  const [crop, setCrop] = useState("");
  const [got, setGot] = useState(false);
  const [fert, setFert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { N, P, K, temperature, humidity, pH, rainfall } = inputData;

    try {
      const response = await axios.get(`/api/v1/crops/singlecrop`, {
        params: {
          data: [N, P, K, temperature, humidity, pH, rainfall].map(parseFloat),
        },
      });
      // Extract the prediction from the response and do something with it
      //console.log("Prediction:", response.data.prediction.prediction);

      setCrop(response.data.prediction.prediction);

      // Fire the search after the prediction arrives
      const searchResponse = await axios.get(
        `/api/v1/crops/search?name=${response.data.prediction.prediction[0]}`
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
      <div className="h-screen overflow-y-auto">
        <div className="isolate bg-white px-6   lg:px-8">
          {loading && <ApiLoading />}
          {got ? (
            <>
              <div className="mx-auto max-w-2xl text-center">
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  You shoul grow
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {crop}
                </h2>
              </div>
              {fert && fert.length > 0 ? (
                <div className="mx-auto max-w-2xl text-center">
                  <p className="mt-2 text-lg leading-8 text-gray-800 font-bold">
                    You can buy this product from our store!
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                    {fert.map((product) => (
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
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-2xl text-center">
                  <p className="mt-2 text-lg leading-8 text-gray-800 font-bold">
                    No products found
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Crop Prediction !
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  Enter your field properties
                </p>
              </div>

              <form
                className="mx-auto mt-16 max-w-xl sm:mt-20"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-semibold leading-6 text-gray-900"
                    >
                      Nitrogen
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
                      Phosphorus
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
                      Potassium
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
      </div>
    </>
  );
}
