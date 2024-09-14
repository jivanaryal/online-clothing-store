type Props = {};
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
const Footer = (props: Props) => {
  return (
    <div className="px-44 py-8 min-h-20 flex justify-between">
      <div className="left flex flex-col gap-5">
        <h1 className="font-medium text-3xl">Fashion</h1>
        <div className="flex flex-col gap-3">
          <p className="font-medium">Social Media</p>
          <div className="flex gap-2 text-2xl cursor-pointer">
            <FaSquareFacebook />
            <FaTwitterSquare />
            <FaLinkedin />
            <FaSquareInstagram />
          </div>
        </div>
      </div>
      <div className="middle flex gap-9">
        <div className="shop-section flex flex-col gap-2">
          <p className="font-medium ">Shop</p>
          <p>Product</p>
          <p>Overview</p>
          <p>Pricing</p>
          <p>Releases</p>
        </div>
        <div className="company-section flex flex-col gap-2">
          <p className="font-medium ">Company</p>
          <p>About Us</p>
          <p>Contact</p>
          <p>News</p>
          <p>Support</p>
        </div>
      </div>
      <div className="right flex flex-col gap-3">
        <p className="font-medium">STAY UPTO DATE</p>
        <div className="border-black border-2 rounded-md min-h-6 flex gap-3">
          <input
            type="text"
            placeholder="Enter your email"
            className="outline-none border-0 px-1 py-1"
          />
          <button className="bg-black text-white px-2">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
