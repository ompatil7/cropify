/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import reactLogo from "../../assets/reactLogo.svg";
import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { logo, lock, hamburgerMenu, close } from "../../assets";
import logo from "../../assets/logo.svg";
import lock from "../../assets/lock.svg";
import hamburgerMenu from "../../assets/hamburgerMenu.svg";
import close from "../../assets/hamburgerMenu.svg";
// import { logo, lock, hamburgerMenu, close } from "./../../assets";

function NewNavigation() {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => setToggle(!toggle);
  return (
    <div>
      <nav>
        <div className="w-full h-[75px] bg-[#e7f9e7] border-b">
          <div className="md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
            <img src={logo} className="h-[25px]" />

            <div className="hidden md:flex items-center ">
              <ul className="flex gap-4">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/crops">Crops</NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink to="/contactus">Contact us</NavLink>
                </li>
                <li>
                  <NavLink to="/createproduct">Create product</NavLink>
                </li>
              </ul>
            </div>

            <div className="hidden md:flex">
              {/* <button className="flex justify-between items-center  bg-transparent  px-6 gap-2">
                <img src={lock} />
                Login
              </button> */}
              <NavLink
                to="/login"
                className="flex justify-between items-center  bg-transparent  px-6 gap-2"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="px-8 py-3 rounded-md bg-[#228B22] hover:bg-green-600 text-white font-bold"
              >
                Signup
              </NavLink>
            </div>

            <div className="md:hidden" onClick={handleClick}>
              <img src={toggle ? close : hamburgerMenu} />
            </div>
          </div>

          <div
            className={
              toggle
                ? "absolute z-10 p-4  bg-[#e7f9e7] w-full px-8 md:hidden border-b"
                : "hidden"
            }
          >
            <ul>
              {/* <li className="p-4 hover:bg-gray-100">Home</li>
              <li className="p-4 hover:bg-gray-100">Shop</li>
              <li className="p-4 hover:bg-gray-100">Contact Us</li> */}
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/crops">Crops</NavLink>
              </li>
              <li className="p-4 hover:bg-gray-100">
                {" "}
                <NavLink to="/contactus">Contact us</NavLink>
              </li>
              <li className="p-4 hover:bg-gray-100">
                <NavLink to="/createproduct">Create product</NavLink>
              </li>
              <div className="flex flex-col my-4 gap-4">
                <button className="border border-[228B22] flex justify-center items-center  bg-transparent  px-6 gap-2 py-4">
                  <img src={lock} />
                  Login
                </button>
                <button className="px-8 py-5 rounded-md bg-[#228B22] text-white font-bold">
                  Sign Up For Free
                </button>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NewNavigation;
