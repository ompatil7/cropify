/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ApiLoading from "../components/ApiLoading";
import Table from "@mui/joy/Table";
import { Divider, Typography } from "@mui/joy";

const CreateProduct = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    price: "",
    quantity: "",
    type: "",
    subtype: "",
    description: "",
    usage: "",
    soldby: "",
    storelocation: [],
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [stores, setStores] = useState([]);
  const [numStores, setNumStores] = useState(1); // State to track the number of stores selected

  const handleNumStoresChange = (e) => {
    setNumStores(parseInt(e.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5173/api/v1/users/user"
        );
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Error fetching user data. Please try again.");
      }
    };

    const fetchStore = async () => {
      try {
        const response = await axios.get("http://localhost:5173/api/v1/store");
        // setUserData(response.data.user);
        // console.log("store data", response.data.data.data);
        setStores(response.data.data.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
        setErrorMessage("Error fetching store data. Please try again.");
      }
    };
    fetchStore();
    fetchData();
  }, []);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      soldby: userData._id || "", // Ensure userData._id is available before setting soldby
    }));
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));
    setSelectedImage(file ? URL.createObjectURL(file) : undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (let key in formData) {
      if (key !== "storelocation" && !key.startsWith("store")) {
        data.append(key, formData[key]);
      }
    }

    // Append storeLocation array directly
    formData.storelocation.forEach((storeId, index) => {
      data.append(`storelocation[${index}]`, storeId);
    });

    // data.append("storeLocation", JSON.stringify(formData.storeLocation));
    // console.log("try location", storeLocations);

    // data.append("storeLocation", JSON.stringify(storeLocations));
    // Convert FormData to regular object for logging
    const formDataObject = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log("data to send ", formDataObject);

    try {
      console.log("creating prod ", data);
      await axios.post("http://127.0.0.1:3000/api/v1/crops/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Product created successfully!");
    } catch (err) {
      setErrorMessage("Error creating product. Please try again.");
      console.error("Error creating product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnotherProduct = () => {
    setSuccessMessage("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: "",
      image: null,
      price: "",
      quantity: "",
      type: "",
      subtype: "",
      description: "",
      usage: "",
    }));
  };

  // const [copied, setCopied] = useState(false);
  const handleCopyToClipboard = (id) => {
    navigator.clipboard.writeText(id);

    // toast.success("ID copied to clipboard");
  };

  return (
    <div className="container mx-auto">
      {successMessage ? (
        <div className="text-center my-8">
          <h2 className="text-green-500">{successMessage}</h2>
          <button
            onClick={handleAddAnotherProduct}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
          >
            Add Another Product
          </button>
        </div>
      ) : (
        <>
          <div className="h-screen overflow-y-auto">
            <div className="mx-auto max-w-1xl   h-screen overflow-y-auto">
              <form onSubmit={handleSubmit} className="">
                <div className="mx-auto max-w-2xl text-center ">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Create Product
                    </h2>
                  </div>
                  <div className="flex flex-col justify-center lg:flex-row gap-16 mt-5  px-3 py-2 mx-auto">
                    <div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Product Name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="images"
                        >
                          Image
                        </label>

                        <input
                          type="file"
                          name="image"
                          id="image"
                          onChange={handleFileChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        />
                      </div>
                      {selectedImage && (
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="images"
                          >
                            Image
                          </label>
                          <img
                            src={selectedImage}
                            alt="selected image"
                            className="max-h-[300px] object-contain"
                          />
                        </div>
                      )}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="price"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={formData.price}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Price"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="quantity"
                        >
                          Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Quantity"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="type"
                        >
                          Type
                        </label>
                        <select
                          name="type"
                          id="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="Fertilizer">Fertilizer</option>
                          <option value="Seed">Seed</option>
                          <option value="Crop Protection">
                            Crop Protection
                          </option>
                        </select>
                      </div>
                      {formData.type === "Fertilizer" && (
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="subtype"
                          >
                            Subtype
                          </label>
                          <select
                            name="subtype"
                            id="subtype"
                            value={formData.subtype}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          >
                            <option value="">Select Subtype</option>
                            <option value="Nano Fertilizer">
                              Nano Fertilizer
                            </option>
                            <option value="Water Soluble Fertilizer">
                              Water Soluble Fertilizer
                            </option>
                            <option value="Speciality Fertilizer">
                              Speciality Fertilizer
                            </option>
                          </select>
                        </div>
                      )}
                      {formData.type === "Seed" && (
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="subtype"
                          >
                            Subtype
                          </label>
                          <select
                            name="subtype"
                            id="subtype"
                            value={formData.subtype}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          >
                            <option value="">Select Subtype</option>
                            <option value="field crop seed">
                              Field crop seed
                            </option>
                            <option value="vegetable seed">
                              Vegetable seed
                            </option>
                            <option value="fruit seed">Fruit seed</option>
                          </select>
                        </div>
                      )}
                      {formData.type === "Crop Protection" && (
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="subtype"
                          >
                            Subtype
                          </label>
                          <select
                            name="subtype"
                            id="subtype"
                            value={formData.subtype}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                          >
                            <option value="">Select Subtype</option>
                            <option value="Fungicides">Fungicides</option>
                            <option value="Insecticides">Insecticides</option>
                            <option value="Bio Insecticides">
                              Bio Insecticides
                            </option>
                          </select>
                        </div>
                      )}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="description"
                        >
                          Product Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Product Description"
                          required
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="usage"
                        >
                          Product Usage
                        </label>
                        <textarea
                          name="usage"
                          id="usage"
                          value={formData.usage}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Product Usage"
                          required
                        ></textarea>
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="numStores"
                        >
                          Number of Stores
                        </label>
                        <select
                          name="numStores"
                          id="numStores"
                          value={numStores}
                          onChange={handleNumStoresChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </div>

                      {/* Dynamically render input fields for store IDs based on numStores */}
                      {Array.from({ length: numStores }, (_, index) => (
                        <div key={index} className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor={`store${index + 1}`}
                          >
                            Store {index + 1} ID
                          </label>
                          <input
                            type="text"
                            name={`store${index + 1}`}
                            id={`store${index + 1}`}
                            value={formData.storelocation[index] || ""}
                            onChange={(e) => {
                              const newStoreLocation = [
                                ...formData.storelocation,
                              ];
                              newStoreLocation[index] = e.target.value;
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                storelocation: newStoreLocation,
                              }));
                            }}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder={`Store ${index + 1} ID`}
                            required
                          />
                        </div>
                      ))}

                      {errorMessage && (
                        <div className="text-red-500 text-center my-4">
                          {errorMessage}
                        </div>
                      )}
                      {loading ? (
                        <div className="text-center my-4">
                          <div className="loader inline-block">
                            {<ApiLoading />}
                          </div>
                          {/* Loader or loading message can be rendered here */}
                        </div>
                      ) : successMessage ? (
                        <div className="text-green-500 text-center my-4">
                          {successMessage}
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
              <Divider />
              <div className="mt-6">
                <Typography level="h3">Offline Stores Details</Typography>
                <Table
                  hoverRow
                  borderAxis="both"
                  stickyHeader
                  aria-label="basic table"
                  variant="soft"
                  className="mt-4"
                >
                  <thead>
                    <tr>
                      <th style={{ width: "20%" }}>Name (store name)</th>
                      <th style={{ width: "30%" }}>Address</th>
                      <th>Phone Number</th>
                      <th>ID</th>
                      {/* <th>Protein&nbsp;(g)</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {stores?.map((store) => (
                      <tr key={store.id}>
                        <td>{store.name}</td>
                        <td>{store.address}</td>
                        <td>{store.phonenumber}</td>
                        <td>
                          {" "}
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleCopyToClipboard(store.id)}
                          >
                            {store.id}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateProduct;
