import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-gray-100 py-12 px-10 lg:px-44 text-gray-800">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Left Section */}
        <div className="left flex flex-col gap-5 mb-8 md:mb-0">
          <h1 className="font-bold text-4xl text-black">Fashion</h1>
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-lg">Follow Us</p>
            <div className="flex gap-3 text-3xl text-gray-600 cursor-pointer">
              <FaSquareFacebook className="hover:text-blue-600 transition duration-300" />
              <FaTwitterSquare className="hover:text-blue-400 transition duration-300" />
              <FaLinkedin className="hover:text-blue-700 transition duration-300" />
              <FaSquareInstagram className="hover:text-pink-600 transition duration-300" />
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="middle flex flex-wrap gap-8 md:gap-12 mb-8 md:mb-0">
          <div className="shop-section flex flex-col gap-2">
            <p className="font-semibold text-lg text-black">Shop</p>
            <a href="#" className="hover:text-blue-600 transition duration-300">
              Product
            </a>
            <a href="#" className="hover:text-blue-600 transition duration-300">
              Overview
            </a>
            <a href="#" className="hover:text-blue-600 transition duration-300">
              Pricing
            </a>
            <a href="#" className="hover:text-blue-600 transition duration-300">
              Releases
            </a>
          </div>
          <div className="company-section flex flex-col gap-2">
            <p className="font-semibold text-lg text-black">Company</p>
            <a href="#" className="hover:text-blue-600 transition duration-300">
              About Us
            </a>
            <a href="#" className="hover:text-blue-600 transition duration-300">
              Contact
            </a>
            <a href="#" className="hover:text-blue-600 transition duration-300">
              News
            </a>
            <a href="#" className="hover:text-blue-600 transition duration-300">
              Support
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="right flex flex-col gap-3">
          <p className="font-semibold text-lg text-black">Stay Up to Date</p>
          <div className="flex items-center border-2 border-gray-300 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Enter your email"
              className="flex-grow px-3 py-2 text-gray-700 outline-none"
            />
            <button className="bg-black text-white px-4 py-2 hover:bg-gray-900 transition duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Fashion. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
