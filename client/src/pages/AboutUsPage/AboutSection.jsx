import React from "react";
import img from "../../assets/about.svg";
import Button from "./Layout/Button";
import Heading from "./Layout/Heading";

const AboutSection = () => {
  return (
    <div className=" md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 ">
      <div className=" w-full md:w-2/4">
        <img src={img} alt="img" />
      </div>

      <div className="w-full md:w-2/4 text-center space-y-2">
        <Heading title1="About" title2="Us?" />
        <p className=" text-lightText">
          At Cropify, we're not just another supplier of agricultural products;
          we're your partners in growth and sustainability. With a deep
          commitment to quality, innovation, and environmental stewardship, we
          strive to empower farmers and gardeners alike with the tools and
          knowledge they need to thrive. From premium seeds and fertilizers to
          cutting-edge crop protection solutions, we offer a comprehensive range
          of products tailored to meet your specific needs. Our team of experts
          is dedicated to providing personalized recommendations and expert
          advice to help you achieve optimal results while minimizing
          environmental impact. Together, let's cultivate success, nurture the
          land, and harvest a better tomorrow.
        </p>

        {/* <Link to="contact" spy={true} smooth={true} duration={500}>
          <Button title="Contact Us" />
        </Link> */}
      </div>
    </div>
  );
};

export default AboutSection;
