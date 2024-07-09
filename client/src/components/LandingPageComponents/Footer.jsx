/* eslint-disable no-unused-vars */
import logo from "../../assets/logo.svg";
import {
  FaFacebookF,
  FaDribbble,
  FaLinkedinIn,
  FaInstagram,
  FaBehance,
  FaTwitterSquare,
} from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper ">
      <div className="w-full bg-white py-8 ">
        <div className="md:max-w-[1480px] m-auto grid md:grid-cols-5 max-[780px]:grid-cols-2  gap-8 max-w-[600px]  px-4 md:px-0">
          <div className="col-span-2">
            <img src={logo} className="h-[25px]" />
            <h3 className="text-2xl font-bold mt-10">Contact Us</h3>
            <h3 className="py-2 text-[#6D737A]">Call : Number</h3>
            <h3 className="py-2 text-[#6D737A]">
              Address : K.K.W.I.E.E.R.<br></br> Nashik, MH
            </h3>
            <h3 className="py-2 text-[#363A3D]">Email: cropse@gmail.com</h3>
            <div className="flex gap-4 py-4">
              <div className="p-4 bg-[#E9F8F3] rounded-xl">
                <FaFacebookF size={25} style={{ color: "#4DC39E" }} />
              </div>
              <div className="p-4 bg-[#E9F8F3] rounded-xl">
                <FaTwitterSquare size={25} style={{ color: "#4DC39E" }} />
              </div>
              <div className="p-4 bg-[#E9F8F3] rounded-xl">
                <FaLinkedinIn size={25} style={{ color: "#4DC39E" }} />
              </div>
              <div className="p-4 bg-[#E9F8F3] rounded-xl">
                <FaInstagram size={25} style={{ color: "#4DC39E" }} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold">Explore</h3>
            <ul className="py-6 text-[#6D737A]">
              <li className="py-2">Home</li>
              <li className="py-2">About</li>
              <li className="py-2">Shop</li>
              <li className="py-2">Reviews</li>
              <li className="py-2">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold">Category</h3>
            <ul className="py-6 text-[#6D737A]">
              <li className="py-2">Fertilizers</li>
              <li className="py-2">Crops</li>
              <li className="py-2">Soil</li>
              <li className="py-2">Business</li>
            </ul>
          </div>

          <div className="max-[780px]:col-span-2">
            <h3 className="text-2xl font-bold">Subscribe</h3>
            <h3 className="py-2 text-[#6D737A]">
              Please subcribe, <br></br> to stay in constant touch via emails.
            </h3>
            <form className="py-4">
              <input
                className="bg-[#F2F3F4] p-4 w-full rounded"
                placeholder="Email here"
              />
              <button className="max-[780px]:w-full my-4 px-5 py-3 rounded-md bg-[#228B22] text-white font-medium">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
