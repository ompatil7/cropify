/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import ApiLoading from "./ApiLoading";
import { useParams } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const EditCropDetails = () => {
  //getUser
  const [userData, setUserData] = useState({});
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
    fetchData();
  }, []);
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      soldby: userData._id || "", // Ensure userData._id is available before setting soldby
    }));
  }, [userData]);
  //getUser

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
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //getCrop
  const params = useParams();
  useEffect(
    function () {
      async function getSingleCrop() {
        try {
          setIsLoading(true);
          setError("");
          const response = await axios.get(`/api/v1/crops/${params.id}`);
          //console.log("response data ", response.data.data.data); // Handle the response as needed

          if (response.status !== 200)
            throw new Error("Something went wrong with fetching crops");

          const cropData = response.data.data.data;
          if (cropData.length === 0) {
            throw new Error("No crops found");
          }
          setFormData({
            name: cropData.name,
            price: cropData.price,
            quantity: cropData.quantity,
            type: cropData.type,
            subtype: cropData.subtype,
            description: cropData.description,
            usage: cropData.usage,
          });
          //console.log("form data", formData);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getSingleCrop();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.id]
  );
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = formData;
    // const data = new FormData();
    // for (let key in formData) {
    //   data.append(key, formData[key]);
    // }
    //console.log("Form data to send", data);
    try {
      await axios.patch(`/api/v1/crops/${params.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Product updated successfully!");
      //console.log("Update success");
    } catch (err) {
      setErrorMessage("Error creating product. Please try again.");
      console.error("Error creating product:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {isLoading && <ApiLoading />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <div>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
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
                />
              </div>
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
                  <option value="Crop Protection">Crop Protection</option>
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
                    <option value="Nano Fertilizer">Nano Fertilizer</option>
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
                    <option value="field crop seed">Field crop seed</option>
                    <option value="vegetable seed">Vegetable seed</option>
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
                    <option value="Bio Insecticides">Bio Insecticides</option>
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
              {errorMessage && (
                <div className="text-red-500 text-center my-4">
                  {errorMessage}
                </div>
              )}
              {loading ? (
                <div className="text-center my-4">
                  <div className="loader inline-block">{<ApiLoading />}</div>
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
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditCropDetails;
