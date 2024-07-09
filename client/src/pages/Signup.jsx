import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ApiLoading from "../components/ApiLoading";
import SnackBar from "../components/SnackBar";
//import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  //const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (validateForm()) {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios.post(
          "api/v1/users/signup",
          {
            name,
            email,
            password,
            passwordConfirm,
          },
          config
        );

        //console.log("Submitting form data:", res.data.data);

        if (res.data.status === "success") {
          //you can use alert to tell user singup succesfully
          //console.log("Signup successful");
          setShowSuccessAlert(true);
          setTimeout(() => setShowSuccessAlert(false), 2000);
          window.location.assign("/");
        }
      }
    } catch (error) {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  // if (validateForm()) {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const res = await axios.post(
  //     "http://127.0.0.1:3000/api/v1/users/signup",
  //     {
  //       name,
  //       email,
  //       password,
  //       passwordConfirm,
  //     },
  //     config
  //   );
  //   //console.log("Submitting form data:", res.data.data);

  //   if (res.data.status === "success") {
  //     //you can use alert to tell user singup succesfully
  //     //console.log("Signup successful");
  //     setShowSuccessAlert(true);
  //     setTimeout(() => setShowSuccessAlert(false), 2000);
  //     window.location.assign("/login");
  //   } else {
  //     setLoginError(true);
  //     setTimeout(() => setLoginError(false), 2000);
  //   }

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validate name
    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    // Validate confirm password
    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="max-w-md mx-auto mt-8 mb-32 px-4 py-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="text-red-500 text-xs mt-1">{errors.name}</div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="text-red-500 text-xs mt-1">{errors.email}</div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="text-red-500 text-xs mt-1">{errors.password}</div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="text-red-500 text-xs mt-1">
            {errors.confirmPassword}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating acc..." : "Signup"}
        </button>

        {loginError && (
          <SnackBar
            isOpen={true}
            message="Signup failed. Please try again."
            type="error"
          />
        )}
        {showSuccessAlert && (
          <SnackBar
            isOpen={true}
            message="Signup successfull!"
            type="success"
          />
        )}
      </form>
      <div className="mt-3 ml-2 ">
        <span>Already Have an Account ?</span>
        <Link to="/login" className="ml-5 underline  text-blue-400">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default Signup;
