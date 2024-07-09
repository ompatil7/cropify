/* eslint-disable no-unused-vars */
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import useUserData from "../userData";

const AdminLayout = () => {
  const { userData } = useUserData();
  //console.log("Admin Layout", userData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen  ">
      {/* Sidebar */}
      <div
        className={`fixed h-screen bg-gray-800 text-white w-1/4 py-4 px-6 ${
          isSidebarOpen ? "" : "hidden"
        } sm:block`}
      >
        <h1 className="text-lg font-semibold mb-4">Profile</h1>
        <nav>
          <ul>
            <li>
              <NavLink
                to=""
                className="block py-2 hover:bg-gray-700 rounded-md"
                activeClassName="font-bold"
              >
                Profile
              </NavLink>
            </li>
            {userData?.user?.role === "user" && (
              <li>
                <NavLink
                  to="/profile/myorders"
                  activeClassName="font-bold"
                  className="block py-2 hover:bg-gray-700 rounded-md"
                >
                  My Orders
                </NavLink>
              </li>
            )}

            {userData?.user?.role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/profile/myorders"
                    activeClassName="font-bold"
                    className="block py-2 hover:bg-gray-700 rounded-md"
                  >
                    My Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile/bookingdata"
                    activeClassName="font-bold"
                    className="block py-2 hover:bg-gray-700 rounded-md"
                  >
                    Booking Data
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile/mostpop"
                    activeClassName="font-bold"
                    className="block py-2 hover:bg-gray-700 rounded-md"
                  >
                    Reviews and Ratings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile/createproduct"
                    activeClassName="font-bold"
                    className="block py-2 hover:bg-gray-700 rounded-md"
                  >
                    Create product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile/editcrops"
                    activeClassName="font-bold"
                    className="block py-2 hover:bg-gray-700 rounded-md"
                  >
                    Edit your products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile/statistics"
                    activeClassName="font-bold"
                    className="block py-2 hover:bg-gray-700 rounded-md"
                  >
                    Statistics
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      {/* Page Content */}
      <div className="flex-1 p-6">
        <button
          className="block sm:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
