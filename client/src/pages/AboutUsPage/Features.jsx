// import React from "react";
// import Heading from "./Layout/Heading";
// import FeatureCard from "./Layout/FeatureCard";
// import webImg from "../../assets/web-dev.svg";
// import appImg from "../../assets/App-dev.svg";
// import graphicImg from "../../assets/graphic.svg";
// import digitalImg from "../../assets/digital.svg";

// const Features = () => {
//   return (
//     <div className=" min-h-screen flex flex-col items-center md:px-32 px-5 my-10">
//       <Heading title1="Our" title2="Courses" />

//       <div className=" flex flex-wrap justify-center gap-6 mt-6">
//         <FeatureCard img={webImg} title="Web Development" />
//         <FeatureCard img={appImg} title="App Development" />
//         <FeatureCard img={graphicImg} title="Graphic Designer" />
//         <FeatureCard img={digitalImg} title="Digital Marketing" />
//       </div>
//     </div>
//   );
// };

// export default Features;

import React from "react";
import Heading from "./Layout/Heading";
import FeatureCard from "./Layout/FeatureCard";
// import webImg from "../../assets/alt.avif";
// import webImg from "../../assets/web-dev.svg";
import webImg from "../../assets/soil1.avif";
import appImg from "../../assets/soil2.avif";
// import appImg from "../../assets/App-dev.svg";
import graphicImg from "../../assets/graphic.svg";
import digitalImg from "../../assets/digital.svg";

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col items-center md:px-32 px-5 my-10">
      <Heading title1="Our" title2="Features" />

      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <FeatureCard
          img={webImg}
          title="Seed and Fertilizer Expertise"
          altText="Seed and Fertilizer Expertise image"
          description="Get top-quality seeds and fertilizers expertly curated for optimal growth and yield. Our range includes a variety of crops and nutrient-rich fertilizers, backed by personalized advice from our agronomy team. Start your journey to a successful harvest with us!"
        />
        <FeatureCard
          img={appImg}
          title="Soil Enrichment Solutions"
          altText="Soil Enrichment Solutions image"
          description="Elevate your farming potential with our soil enrichment solutions, carefully crafted to revive and nourish depleted soils. Harnessing the power of science and sustainability, our range of products promotes optimal plant growth while fostering eco-conscious farming practices."
        />
        <FeatureCard
          img={graphicImg}
          title="User Review Analysis"
          altText="User Review Analysis image"
          description="We utilize bar graph analysis to distill user reviews, identifying product strengths and areas for improvement. This data-driven approach empowers informed decision-making, guiding us to refine and enhance our offerings based on customer sentiments."
        />
        <FeatureCard
          img={digitalImg}
          title="Local Fertilizer Store Locator"
          altText="Local Fertilizer Store Locator image"
          description="Effortlessly find nearby fertilizer outlets with our city-specific graph feature, facilitating convenient access to agricultural essentials. Simplifying the search for farming necessities, we ensure farmers have easy access to quality fertilizers."
        />
      </div>
    </div>
  );
};

export default Features;
