import axios from "axios";
import { useState } from "react";
// import Typography from "@mui/joy/Typography";
import { ForgetRedirectToLogin } from "../components/ForgetRedirectToLogin";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });
  const [screen, setScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Set loading state when submitting the form
      try {
        /*  const config = {
          headers: {
            "Content-Type": "application/json",
          },
        }; */
        const { data } = await axios.post("api/v1/users/forgotPassword", {
          email,
        });
        //console.log("User Data :", data);
        setScreen(true); // Redirect to login after successful submission
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error response
      } finally {
        setLoading(false); // Reset loading state after form submission
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
    };
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  return (
    <>
      {screen ? (
        <ForgetRedirectToLogin />
      ) : (
        <div className="max-w-md mx-auto mt-8 px-4 py-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Forget Password</h2>
          <h1 className="text font mb-6">
            Please Enter Your Email To change the Password
          </h1>
          <form onSubmit={handleSubmit}>
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
                required
                disabled={loading} // Disable input while loading
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading ? "opacity-50 cursor-not-allowed" : "" // Disable button and change cursor during loading
              }`}
              disabled={loading} // Disable button while loading
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ForgetPassword;
