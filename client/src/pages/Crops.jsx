import axios from "axios";
import { useState, useEffect } from "react";
import ApiLoading from "../components/ApiLoading";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import NewProductCard from "../components/NewProductCard";
import { Typography } from "@mui/joy";
import ClearIcon from "@mui/icons-material/Clear";

function Crops({ cart, setCart }) {
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [newArray, setNewArray] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedFilterLabel, setSelectedFilterLabel] = useState("");

  useEffect(function () {
    async function getCrops() {
      try {
        setIsLoading(true);
        setError("");
        const response = await axios.get(`/api/v1/crops/`);
        console.log("response ", response.data.data.data); // Handle the response as needed

        if (response.status !== 200)
          throw new Error("Something went wrong with fetchintg crops");

        const cropsData = response.data.data.data;
        if (cropsData.length === 0) {
          throw new Error("No crops found");
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
    setNewArray([...crops]);
  }, [crops]);

  /*  const handleSortChange = (value) => {
    let sortedArray = [...crops];
    if (value === "price-high-to-low") {
      sortedArray.sort((a, b) => b.price - a.price);
    } else if (value === "price-low-to-high") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (value === "recently-added") {
      sortedArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setNewArray(sortedArray);
  }; */
  const handleSortAndFilterChange = (sortValue, filterValue) => {
    let sortedAndFilteredArray = [...crops];
    // Sorting
    if (sortValue === "price-high-to-low") {
      sortedAndFilteredArray.sort((a, b) => b.price - a.price);
    } else if (sortValue === "price-low-to-high") {
      sortedAndFilteredArray.sort((a, b) => a.price - b.price);
    } else if (sortValue === "recently-added") {
      sortedAndFilteredArray.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    // Filtering
    if (filterValue !== "all") {
      sortedAndFilteredArray = sortedAndFilteredArray.filter(
        (crop) => crop.type === filterValue
      );
      setSelectedFilterLabel(filterValue);
    } else {
      setSelectedFilterLabel("");
    }
    setNewArray(sortedAndFilteredArray);
    setFilter(filterValue);
  };

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

  const handelSearch = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // Set loading to true when starting the search
      const response = await axios.get(`/api/v1/crops/search?name=${search}`);
      //console.log("Search response: ", response.data); // Log the response data

      if (response.status !== 200)
        throw new Error("Something went wrong with fetching crops");

      let cropsData = response.data.data.crop;

      //console.log("Search results: ", cropsData); // Log the search results

      if (cropsData.length === 0) {
        throw new Error("No crops found");
      }

      // Update the crops state with the search results
      setCrops(cropsData);
      setError(""); // Reset error state
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Set loading to false after search completion
    }
  };
  function CustomSelect({ label, options, value, onChange }) {
    return (
      /*   <select
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        className="w-full h-10 border-2 border-gray-500 focus:outline-none focus:border-gray-500 text-gray-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
      > */
      <select
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        value={value}
        onChange={onChange}
        className="w-full h-10 border-2 border-gray-500 focus:outline-none focus:border-gray-500 text-gray-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between m-10">
        <form
          className="flex flex-col md:flex-row gap-3 w-full md:w-1/2 items-center"
          onSubmit={handelSearch}
        >
          <div className="flex item-center ml-16">
            <input
              type="text"
              placeholder="Search Crops.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-gray-500 focus:outline-none focus:border-gray-500"
            />
            <button
              type="submit"
              className="bg-gray-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
            >
              Search
            </button>
          </div>
        </form>
        <div className="flex items-center space-x-4 mr-20">
          <CustomSelect
            label="Sort by"
            options={[
              { value: "price-high-to-low", label: "Price - High to Low" },
              { value: "price-low-to-high", label: "Price - Low to High" },
              { value: "recently-added", label: "Recently Added" },
            ]}
            onChange={(e) => handleSortAndFilterChange(e.target.value, filter)}
          />
          <CustomSelect
            label="Filter by type"
            options={[
              { value: "Fertilizer", label: "Fertilizer" },
              { value: "Seed", label: "Seed" },
              { value: "Crop Protection", label: "Crop Protection" },
            ]}
            /*  value={filter} */
            onChange={(e) =>
              handleSortAndFilterChange(e.target.value, e.target.value)
            }
          />
        </div>
      </div>

      {selectedFilterLabel && (
        <div className="ml-28 flex flex-row space-x-3">
          <Typography level="h4">{selectedFilterLabel}s</Typography>
          {filter !== "all" && (
            <>
              <button
                onClick={() =>
                  handleSortAndFilterChange("recently-added", "all")
                }
                className="ml-2 p-1  rounded-full bg-red-500 text-white focus:outline-none"
              >
                <ClearIcon className="w-4 h-4" />
              </button>
            </>
          )}
          {/* <h1>{selectedFilterLabel}</h1> */}
        </div>
      )}
      {isLoading && <ApiLoading />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 md-new:grid-cols-4 justify-items-center justify-center gap-y-20 gap-x-14 mt-16 mb-5">
          {newArray?.map((crop) => (
            <div
              className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
              key={crop._id}
            >
              <Link to={`/crops/${crop._id}`}>
                <NewProductCard
                  cart={cart}
                  cropid={crop._id}
                  setCart={setCart}
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
    </>
  );
}

export default Crops;
