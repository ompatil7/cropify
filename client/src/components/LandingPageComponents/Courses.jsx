import "./Courses.css";
import fertilizerIcon from "../../assets/fertilize.png";
import seedsIcon from "../../assets/seedIcon.png";
import protectIcon from "../../assets/shield.png";
import { motion } from "framer-motion";
import { useMemo } from "react";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../ScrollAnimationWrapper";

const Courses = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="empty-container">
      <ScrollAnimationWrapper>
        <motion.div className="heading" variants={scrollAnimation}>
          <h1>
            Popular <span>Categories</span>
          </h1>
          <p>Have a look at specially curated lists</p>
        </motion.div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <motion.div variants={scrollAnimation}>
          <div className="rectangles-container">
            <div className="empty-rectangle fertilizers">
              <img
                src={fertilizerIcon}
                alt="Fertilizers"
                className="rectangle-icon"
              />
              <span className="rectangle-name">Fertilizers</span>
            </div>
            <div className="empty-rectangle soil">
              <img src={protectIcon} alt="Soil" className="rectangle-icon" />
              <span className="rectangle-name">Crop Protection</span>
            </div>
            <div className="empty-rectangle seeds">
              <img src={seedsIcon} alt="Seeds" className="rectangle-icon" />
              <span className="rectangle-name">Seeds</span>
            </div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Courses;
