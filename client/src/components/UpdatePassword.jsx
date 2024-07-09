import axios from "axios";
import { useState } from "react";
import ApiLoading from "./ApiLoading";

function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch(
        "http://localhost:5173/api/v1/users/updateMyPassword",
        formData
      );
      setSuccess(true);
    } catch (error) {
      console.error("API Error:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {loading ? (
        <div className="text-center my-4">
          <div className="loader inline-block">
            <ApiLoading />
          </div>
        </div>
      ) : (
        <>
          {success ? (
            <div className="mb-4 text-green-700">
              Password updated successfully. Please login again into the site to
              update changes.
            </div>
          ) : null}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="passwordCurrent"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="passwordCurrent"
                name="passwordCurrent"
                value={formData.passwordCurrent}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update Password
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default UpdatePassword;

// return (
//   <div className="max-w-md mx-auto mt-8">
//     {loading ? (
//       <ApiLoading />
//     ) : (
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             htmlFor="passwordCurrent"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Current Password
//           </label>
//           <input
//             type="password"
//             id="passwordCurrent"
//             name="passwordCurrent"
//             value={formData.passwordCurrent}
//             onChange={handleChange}
//             className="mt-1 p-2 border rounded-md w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700"
//           >
//             New Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="mt-1 p-2 border rounded-md w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="passwordConfirm"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             id="passwordConfirm"
//             name="passwordConfirm"
//             value={formData.passwordConfirm}
//             onChange={handleChange}
//             className="mt-1 p-2 border rounded-md w-full"
//           />
//         </div>
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded-md"
//           >
//             Update Password
//           </button>
//         </div>
//       </form>
//     )}
//     {!loading && success && (
//       <div>
//         Password updated successfully, please login again
//         {/* <Button>Login</Button> */}
//       </div>
//     )}
//   </div>
// );
// }

// export default UpdatePassword;
