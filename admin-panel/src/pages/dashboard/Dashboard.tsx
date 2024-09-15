import React from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaClipboardList, FaPlus, FaTags, FaShoppingCart } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center flex-wrap gap-6 p-8">
      <Link to="/products/add-product" className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-blue-600 transition duration-300">
          <FaPlus size={48} className="mb-4" />
          <h3 className="text-xl font-semibold">Add Product</h3>
        </div>
      </Link>

      <Link to="/products/product-list" className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="bg-green-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-green-600 transition duration-300">
          <FaBoxOpen size={48} className="mb-4" />
          <h3 className="text-xl font-semibold">View Products</h3>
        </div>
      </Link>

      <Link to="/orders" className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="bg-yellow-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-yellow-600 transition duration-300">
          <FaShoppingCart size={48} className="mb-4" />
          <h3 className="text-xl font-semibold">View Orders</h3>
        </div>
      </Link>

      <Link to="/products/categories" className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="bg-red-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-red-600 transition duration-300">
          <FaTags size={48} className="mb-4" />
          <h3 className="text-xl font-semibold">View Categories</h3>
        </div>
      </Link>

      <Link to="/products/subcategories" className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="bg-purple-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center hover:bg-purple-600 transition duration-300">
          <FaClipboardList size={48} className="mb-4" />
          <h3 className="text-xl font-semibold">View Subcategories</h3>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
