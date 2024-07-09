/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import UpdatePassword from "../components/UpdatePassword";
import ApiLoading from "../components/ApiLoading";
import SnackBar from "../components/SnackBar";

const Profile = ({ userData }) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
  });

  // Add a new state to hold the edited form data
  const [editedFormData, setEditedFormData] = useState({
    name: "",
    email: "",
    photo: null,
  });

  // Add state variables for errors
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
  });
  const [backendError, setBackendError] = useState("");
  useEffect(() => {
    if (userData.user) {
      setFormData({
        name: userData.user.name,
        email: userData.user.email,
        photo: userData.user.image || null, // Set the default photo
      });

      setEditedFormData({
        name: userData.user.name,
        email: userData.user.email,
        photo: userData.user.image || null,
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear field error when the field is edited again
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // Email validation
    if (name === "email" && value) {
      if (!value.includes("@")) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email must contain '@'",
        }));
      } else if (!value.includes(".")) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email must contain '.'",
        }));
      } else if (!value.includes("com")) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email must contain 'com'",
        }));
      } else {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: "", // Clear email error if validation passes
        }));
      }
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setEditedFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("editedFormData:", editedFormData);
    try {
      const formData = new FormData();
      setLoading(true);
      formData.append("name", editedFormData.name);
      formData.append("email", editedFormData.email);
      formData.append("photo", editedFormData.photo); // Append photo as a file

      //console.log("FormData to be submitted", formData);
      const response = await axios.patch("/api/v1/users/updateme", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set Content-Type as multipart/form-data
        },
      });

      //console.log("Form submitted:", response.data.data.user);
      setFormData(editedFormData);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 2000);
      setEditMode(false);
    } catch (error) {
      if (error.response) {
        // Backend error handling
        if (error.response.status === 400) {
          setBackendError(error.response.data.message);
          setLoginError(true);
          setTimeout(() => setLoginError(false), 2000);
        }
      } else {
        console.error("Error submitting form:", error);
        setLoginError(true);
        setTimeout(() => setLoginError(false), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedFormData(formData); // Reset editedFormData to original formData
    setEditMode(false);
    setBackendError(""); // Clear any backend error message
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-8">
        <div className="flex items-center mb-4">
          <img
            src={
              userData.user && userData.user.photo
                ? userData.user.photo
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
                accept="image/*" // Accept only image files
                onChange={handlePhotoChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
              {editedFormData.photo && (
                <div className="w-24 h-24 rounded-full overflow-hidden mr-4 mt-2">
                  <img
                    src={editedFormData.photo}
                    alt="Selected"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
            <div className="text-red-500 mb-4">{backendError}</div>
            <div className="flex justify-between ">
              {loading ? (
                <div className="text-center my-4">
                  <div className="loader inline-block">
                    <ApiLoading />
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              )}
              {loginError && (
                <SnackBar
                  isOpen={true}
                  message="Update failed. Please try again."
                  type="error"
                />
              )}
              {showSuccessAlert && (
                <SnackBar
                  isOpen={true}
                  message="Update successfull!"
                  type="success"
                />
              )}
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
