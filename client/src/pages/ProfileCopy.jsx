/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import UpdatePassword from "../components/UpdatePassword";
import ApiLoading from "../components/ApiLoading";

const Profile = ({ userData }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
  });

  const [loading, setLoading] = useState(false);

  // Add a new state to hold the edited form data
  const [editedFormData, setEditedFormData] = useState({
    name: "",
    email: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  // Add state variables for errors
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
  });
  const [backendError, setBackendError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5173/api/v1/users/user"
        );
        console.log("USEEFFECT GET DATA ,", response.data.user);
        const userDataFromApi = response.data.user;
        if (userDataFromApi) {
          setFormData({
            name: userDataFromApi.name,
            email: userDataFromApi.email,
            photo: userDataFromApi.photo || null,
          });
          setEditedFormData({
            name: userDataFromApi.name,
            email: userDataFromApi.email,
            photo: userDataFromApi.photo || null,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (formData !== null) {
      const fetchData = async () => {
        try {
          const additionalData = await axios.get(
            "http://localhost:5173/api/v1/users/user"
          );
          console.log("Additional data:", additionalData);
        } catch (error) {
          console.error("Error fetching additional data:", error);
        }
      };

      fetchData();
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email address",
        }));
      } else {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const blob = new Blob([file]);
        setEditedFormData((prevData) => ({
          ...prevData,
          photo: file,
        }));
        setPhotoPreview(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error creating blob:", error);
        // Handle error, perhaps display a message to the user
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("editedFormData:", editedFormData);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", editedFormData.name);
      formData.append("email", editedFormData.email);
      formData.append("photo", editedFormData.photo);

      const response = await axios.patch("/api/v1/users/updateme", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Form submitted:", response.data.data.user);
      setFormData({
        ...formData,
        name: editedFormData.name,
        email: editedFormData.email,
        photo: response.data.data.user.photo,
      });
      setEditMode(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setBackendError(error.response.data.message);
      } else {
        console.error("Error submitting form:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedFormData(formData);
    setEditMode(false);
    setBackendError("");
  };

  return (
    <>
      {loading && <ApiLoading />}
      <div className="max-w-md mx-auto mt-8">
        <div className="flex items-center mb-4">
          <img
            src={
              userData.user && userData.user.photo
                ? formData.photo
                : "/default.png"
            }
            alt="User"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold">{formData.name}</h2>
            <p className="text-gray-600">{formData.email}</p>
          </div>
        </div>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedFormData.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
              <span className="text-red-500">{fieldErrors.name}</span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedFormData.email}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
              <span className="text-red-500">{fieldErrors.email}</span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
              {photoPreview && (
                <div className="w-24 h-24 rounded-full overflow-hidden mr-4 mt-2">
                  <img
                    src={photoPreview}
                    alt="Selected"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
            <div className="text-red-500 mb-4">{backendError}</div>
            <div className="flex justify-between ">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex justify-right mb-4">
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <UpdatePassword />
    </>
  );
};

Profile.propTypes = {
  userData: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      image: PropTypes.string,
    }),
  }),
};

export default Profile;
