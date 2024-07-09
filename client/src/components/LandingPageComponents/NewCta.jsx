import emailsImg from "../../assets/contact.svg";
import { motion } from "framer-motion";
import { useMemo } from "react";
import Maps from "../../assets/HugeGlobal.svg";
import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../ScrollAnimationWrapper";
const NewCta = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <>
      <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full my-8">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed w-9/12 sm:w-6/12 lg:w-4/12 mx-auto"
            >
              Huge Global Network of Offline Stores{" "}
            </motion.h3>
            <motion.p
              className="leading-normal  mx-auto my-2 w-10/12 sm:w-7/12 lg:w-6/12"
              variants={scrollAnimation}
            >
              See Cropify everywhere to make it easier for you when you move
              locations.
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <motion.div
              className="py-12 w-full px-8 mt-16"
              variants={scrollAnimation}
            >
              <img src={Maps} className="w-full h-auto" />
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </div>
      <div className="w-full bg-white py-2 md:py-24">
        <ScrollAnimationWrapper>
          <motion.div
            className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 md:px-8"
            variants={scrollAnimation}
          >
            <img
              src={emailsImg}
              alt="Emails"
              className="border-2 border-black rounded-lg w-full h-auto max-w-md mx-auto md:max-w-none md:w-auto"
              style={{ maxWidth: "100%", height: "auto" }}
            />

            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-semibold text-[#333] leading-snug">
                Embark on a <span className="text-[#228B22]">journey</span> of
                making a change
              </h1>
              <h2 className="mt-4 text-lg text-gray-600">
                Please subscribe to stay in constant touch via emails.
              </h2>
              <form className="mt-6 flex flex-wrap">
                <div className="flex flex-col w-full md:w-1/2 pr-0 md:pr-4">
                  <input
                    className="block w-full py-3 px-4 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#228B22]"
                    type="email"
                    placeholder="Enter your email here"
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/2 pl-0 md:pl-4 mt-4 md:mt-0">
                  <input
                    className="block w-full py-3 px-4 bg-gray-100 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#228B22]"
                    type="text"
                    placeholder="Enter your name here"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 block w-full py-4 bg-[#228B22] text-white font-bold rounded-md transition duration-300 hover:bg-[#1E7B1E]"
                >
                  Subscribe Today!
                </button>
              </form>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </>
  );
};

export default NewCta;
