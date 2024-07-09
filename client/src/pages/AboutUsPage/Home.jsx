import React from "react";
import img from "../../assets/hero.svg";
import Button from "./Layout/Button";

const Home = () => {
  return (
    <div className=" min-h-[70vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
      {/* Content */}
      <div className=" md:w-2/4 text-center">
        <h2 className=" text-5xl font-semibold leading-tight">
          Shop From
          <span className="text-brightGreen"> Us</span>
        </h2>
        <p className=" text-lightText mt-5 text-start">
          Enhancing soil quality is crucial for long-term agricultural
          productivity. Through our advanced machine learning algorithms, we can
          analyze vast datasets related to soil health and composition to
          provide tailored recommendations for soil enrichment techniques, such
          as cover croppisng, composting, and precision nutrient management.
        </p>

        {/* <Link to="contact" spy={true} smooth={true} duration={500}>
          <Button title="About Us" />
        </Link> */}
      </div>

      {/* Image div */}
      <div className=" w-full md:w-2/4">
        <img src={img} alt="img" />
      </div>
    </div>
  );
};

export default Home;
