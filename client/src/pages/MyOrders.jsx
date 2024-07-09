import axios from "axios";
import fertilizer from "../assets/fertilizer.jpeg";
import { useState, useEffect } from "react";
import ApiLoading from "../components/ApiLoading";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import ProductCard from "../components/ProductCard";
import NewProductCard from "../components/NewProductCard";
function MyOrders() {
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  useEffect(function () {
    async function getCrops() {
      try {
        setIsLoading(true);
        setError("");
        const response = await axios.get(`/api/v1/bookings/mypurchase`);
        //console.log("response ", response); // Handle the response as needed

        if (response.status !== 200)
          throw new Error("Something went wrong with fetchintg crops");

        const cropsData = response.data.data.crops;
        if (cropsData.length === 0) {
          throw new Error("No orders found");
        }
        setCrops(cropsData);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCrops();
  }, []);
  useEffect(() => {
    // Function to extract query parameters from the URL
    const getQueryParams = (url) => {
      const queryParams = {};
      const params = new URLSearchParams(url);
      for (const param of params.entries()) {
        queryParams[param[0]] = param[1];
      }
      return queryParams;
    };

    // Extract event, user, and price from the URL
    const { crop, user, price } = getQueryParams(location.search);

    // Send a request to your backend to store data in the database
    const storeData = async () => {
      try {
        await axios.get(`http://localhost:5173/api/v1/bookings/booking`, {
          params: { crop, user, price },
        });
        // Redirect to the normal localhost:5173 URL
        window.location.href = "http://localhost:5173/crops";
        //console.log("Data stored successfully");
      } catch (error) {
        console.error("Error storing data:", error);
        // Handle errors
      }
    };

    // Call the function to store data when the component mounts
    storeData();
  }, []);

  return (
    <div className="bg-white px-6 lg:px-8 h-screen overflow-y-auto">
      {isLoading && <ApiLoading />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 md-new:grid-cols-4 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {crops?.map((crop) => (
            <div
              className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
              key={crop._id}
            >
              <Link to={`/crops/${crop._id}`}>
                <NewProductCard
                  name={crop.name}
                  image={crop.image}
                  type={crop.type}
                  price={crop.price}
                  description={crop.description}
                  quantity={crop.quantity}
                />
              </Link>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default MyOrders;
// const handleCropsRequest = async () => {
//   try {
//     const response = await axios.get("http://127.0.0.1:3000/api/v1/crops");
//     //console.log(response.data.data.data); // Handle the response as needed
//     setCrops(response.data.data.data);
//   } catch (error) {
//     console.error(error);
//   }
// };
