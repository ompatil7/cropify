/* eslint-disable react/prop-types */
import reactLogo from "../../assets/reactLogo.svg";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Badge from "@mui/joy/Badge";
import Box from "@mui/joy/Box";

import Typography from "@mui/joy/Typography";

function Navbar({ userData, cart }) {
  // //console.log("cart in nav", cart);
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <nav className=" bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      {/* max-w-6xl */}
      <div className="px-4 mx-auto ">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div className="flex items-center py-5 px-3 text-gray-700 hover:text-gray-900 ">
              <img src={reactLogo} className="w-6 h-6 mr-2" />

              <span className="font-bold">Cropify</span>
            </div>
            {/* Left Nav */}
            <div className="hidden md:flex items-center  space-x-3">
              <NavLink
                to="/"
                className={`py-5 px-3 text-gray-700 hover:text-gray-950  ${
                  location.pathname === "/" ? "font-bold text-green-800" : ""
                }`}
              >
                Home
              </NavLink>

              <NavLink
                to="/crops"
                className={`py-5 px-3 text-gray-700 hover:text-gray-950 ${
                  location.pathname === "/crops" ? "font-bold opacity-1 " : ""
                }`}
              >
                Crops
              </NavLink>

              {/* <NavLink
                to="/contactus"
                className="py-5 px-3 text-gray-700 hover:text-gray-950"
              >
                Contact us
              </NavLink> */}
              <NavLink
                to="/aboutus"
                className={`py-5 px-3 text-gray-700 hover:text-gray-950 ${
                  location.pathname === "/aboutus" ? "font-bold" : ""
                }`}
              >
                About us
              </NavLink>
              <NavLink
                to="/ourstores"
                className={`py-5 px-3 text-gray-700 hover:text-gray-950 ${
                  location.pathname === "/ourstores" ? "font-bold" : ""
                }`}
              >
                Our Stores
              </NavLink>
              {userData.status === "success" && (
                <NavLink
                  to="/prediction/crop"
                  className={`py-5 px-3 text-gray-700 hover:text-gray-950 ${
                    location.pathname === "/prediction/crop" ? "font-bold" : ""
                  }`}
                >
                  Predictions
                </NavLink>
              )}
            </div>
          </div>

          {/* Right Nav */}

          <div className="hidden md:flex items-center  space-x-3">
            {userData.status === "success" ? (
              <>
                <NavLink to="/cart" className="py-2 px-3 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                  </svg>
                  {/* <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      minWidth: 20,
                      justifyContent: "space-between",
                    }}
                  >
                    <Badge badgeContent={cart?.length}>
                      <Typography fontSize="xl">🛍</Typography>
                    </Badge>
                  </Box> */}
                </NavLink>
                <NavLink
                  to="/logout"
                  className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-black hover:text-yellow-800 rounded"
                >
                  Logout
                </NavLink>
                <NavLink
                  to="/profile"
                  className="py-5 px-3 text-gray-700 hover:text-gray-950"
                >
                  Profile
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="py-5 px-3 text-gray-700 hover:text-gray-950"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-black hover:text-yellow-800 rounded"
                >
                  Signup
                </NavLink>
              </>
            )}
            {/* {userData.status === "success" &&
              userData.user.role === "admin" && (
                <NavLink
                  to="/admin/profile"
                  className="py-5 px-3 text-gray-700 hover:text-gray-950"
                >
                  Admin
                </NavLink>
              )} */}
          </div>

          {/* Drop down button */}
          <div className="md:hidden flex items-center">
            <button onClick={handleMobileMenuToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      {isMobileMenuOpen && (
        <div>
          <NavLink
            to="/"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Home
          </NavLink>
          <NavLink
            to="/crops"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Crops
          </NavLink>

          {/* <NavLink
            to="/contactus"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Contact us
          </NavLink> */}
          <NavLink
            to="/aboutus"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
          >
            About us
          </NavLink>
          <NavLink
            to="/ourstores"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
          >
            Our Stores
          </NavLink>
          <NavLink
            to="/prediction/crop"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Predictions
          </NavLink>
          {userData.status === "success" ? (
            <>
              <NavLink
                to="/logout"
                className="block py-2 px-2  text-gray-700 hover:text-gray-950 rounded hover:bg-gray-500"
                onClick={handleMenuItemClick}
              >
                Logout
              </NavLink>
              <NavLink
                to="/profile"
                className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
                onClick={handleMenuItemClick}
              >
                Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
                onClick={handleMenuItemClick}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="block py-2 px-2  text-gray-700 hover:text-gray-950 rounded hover:bg-gray-500"
                onClick={handleMenuItemClick}
              >
                Signup
              </NavLink>
            </>
          )}
          {/* {userData.status === "success" && userData.user.role === "admin" && (
            <NavLink
              to="/admin/profile"
              className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
              onClick={handleMenuItemClick}
            >
              Admin
            </NavLink>
          )} */}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
