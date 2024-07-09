/* eslint-disable no-undef */
import React from "react";
import Slider from "react-slick";
//import { FaStore } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function AutoPlay({ locations }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3500,
    autoplaySpeed: 3500,
    cssEase: "linear",
  };
  console.log("LOcation in autoplay ", locations);
  return (
    <div className="slider-container ">
      <Slider {...settings} className="space-x-4">
        {locations.map((location, index) => (
          <div
            key={index}
            className="location-card p-4 border rounded shadow-md space-y-2 justify-evenly"
            style={{ minWidth: "200px" }} // Center the card
          >
            <h3 className="text-center"> Store Name : {location.name}</h3>
            <h3 className="text-center"> Address : {location.address}</h3>

            {/* <div className="flex items-center">
              
              <h3 className="text-center"> Store Name : {location.name}</h3>
            </div>
            <div className="flex items-center">
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
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 12c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                />
              </svg>
              <h3 className="text-center"> Address : {location.address}</h3>
            </div> */}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
