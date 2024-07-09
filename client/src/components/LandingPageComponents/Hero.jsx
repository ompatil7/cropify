import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Uncommented Link import
import heroImg from "../../assets/heroImgCrop.jpg";
import { motion } from "framer-motion";
import { useMemo } from "react";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../ScrollAnimationWrapper";
const Hero = () => {
  const [seedsCount, setSeedsCount] = useState(0);
  const rootStyle = {
    backgroundImage: `url(${heroImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const textContainerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "20px",
    borderRadius: "8px",
    fontFamily: "Roboto, sans-serif",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seedsCount < 100) {
        setSeedsCount(seedsCount + 10);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [seedsCount]);

  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div id="root" className="w-full bg-white py-24" style={rootStyle}>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-8">
        <div className="text-center md:text-left" style={textContainerStyle}>
          <ScrollAnimationWrapper>
            <motion.p
              className="text-2xl md:text-3xl text-white font-medium"
              variants={scrollAnimation}
            >
              A DESTINATION TO AGRICULTURAL SUCCESS
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <motion.h1
              className="mt-4 md:mt-6 text-4xl md:text-5xl text-white font-semibold leading-tight"
              variants={scrollAnimation}
            >
              Access To{" "}
              <span className="text-[#FFD700]">
                {seedsCount > 1 ? seedsCount : "1"}+
              </span>{" "}
              Seeds from <span className="text-[#FFD700]">10+</span> States in
              India
            </motion.h1>
          </ScrollAnimationWrapper>
          <p className="mt-4 md:mt-6 text-lg text-white">
            Innovate & Cultivate: Evolve Your Crop Expertise with Us
          </p>

          <Link to="/crops" variants={scrollAnimation}>
            {" "}
            {/* Corrected Link tag */}
            <button className="mt-6 bg-[#18540E] text-white rounded-md py-3 px-6 hover:bg-[#004d00] transition duration-300">
              Start Shopping today!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
