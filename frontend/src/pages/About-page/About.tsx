import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { IoLocationSharp, IoMailSharp, IoPhonePortraitSharp } from 'react-icons/io5';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 sm:px-12">
      <div className="container mx-auto text-center">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          About <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-12">
          At <span className="font-semibold">Online Clothing Store</span>, we are passionate about providing you with the finest fashion that fits your style. Our mission is to offer high-quality clothing with a unique blend of classic and contemporary designs.
        </p>

        {/* Main Content */}
        <div className="bg-white  rounded-xl p-8 mb-12  ">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded in <strong>[Year]</strong>, Online Clothing Store began as a small venture aimed at redefining the fashion experience. Our team meticulously curates each piece, ensuring you receive only the best in quality and style. We strive to create a shopping experience that exceeds your expectations.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-left text-gray-700 space-y-3">
              <li><strong>Quality:</strong> We are committed to offering top-notch products that stand the test of time.</li>
              <li><strong>Customer Satisfaction:</strong> Your satisfaction is our priority. We go the extra mile to ensure you love your purchase.</li>
              <li><strong>Innovation:</strong> We constantly evolve to bring you the latest trends and styles.</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <IoLocationSharp className="text-3xl text-blue-600 mr-3" />
                <p className="text-gray-700">123 Fashion Street, New York, NY 10001</p>
              </div>
              <div className="flex items-center mb-4 md:mb-0">
                <IoPhonePortraitSharp className="text-3xl text-blue-600 mr-3" />
                <p className="text-gray-700">(123) 456-7890</p>
              </div>
              <div className="flex items-center">
                <IoMailSharp className="text-3xl text-blue-600 mr-3" />
                <p className="text-gray-700">contact@onlineclothingstore.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition transform hover:scale-110">
              <FaFacebookF className="text-3xl" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition transform hover:scale-110">
              <FaInstagram className="text-3xl" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition transform hover:scale-110">
              <FaTwitter className="text-3xl" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition transform hover:scale-110">
              <FaLinkedinIn className="text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
