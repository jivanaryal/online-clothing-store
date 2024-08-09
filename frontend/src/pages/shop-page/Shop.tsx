import { IoFilter } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { PiGreaterThanLight } from "react-icons/pi";
import { FaAngleUp } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import productData from "../../data/products.json";
import { FaAngleDown } from "react-icons/fa6";
import "./range.css";
import { Tproduct } from "@/types/product";
const Shop = () => {
  return (
    <div>
      <div className="top flex items-center justify-between">
        <div className="bg-blue-700 flex text-white items-center gap-3 px-3 py-1">
          <IoFilter />
          <p>Filter</p>
        </div>
        <div className="border-2 border-black flex  items-center gap-3 px-2 py-1">
          <p>Sort by: Popularity</p>
          <p className="text-gray-400 text-sm">
            <FaAngleUp />
            <FaAngleDown />
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-5 gap-8 w-full  ">
        <div className="left col-span-2">
          <div className="filters  py-2">
            <div className="flex items-center justify-between py-1">
              <span className="text-xl font-semibold">Filters</span>
              <MdClose className="text-gray-500" />
            </div>
            <div className="border horizontal line my-1"></div>
            {/* filter items section */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-gray-500">
                <span className="">Shirts</span>
                <PiGreaterThanLight className="" />
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>T-shirts</span>
                <PiGreaterThanLight className="" />
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Hoodie</span>
                <PiGreaterThanLight className="" />
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Jeans</span>
                <PiGreaterThanLight className="" />
              </div>
            </div>
            <div className="border horizontal line my-1"></div>
            {/* Price Range */}
            <div className=" py-2 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold">Price</span>
                <FaAngleUp className="text-gray-500" />
              </div>
              <div className="flex items-center w-3/5 max-w-xl">
                <input
                  type="range"
                  id="range"
                  name="range"
                  min="0"
                  max="100"
                  value="50"
                  className="w-full mx-2 range-input"
                />
              </div>
            </div>
            <div className="border horizontal line my-2"></div>
            {/* Color selection */}
            <div>
              <div className="flex items-center justify-between py-1">
                <span className="text-xl font-semibold">Colors</span>
                <FaAngleUp className="text-gray-500" />
              </div>
              <div className="flex items-center  gap-2 justify-start ">
                <span className="w-9 h-9 bg-green-800 rounded-full"></span>
                <span className="w-9 h-9 bg-blue-800 rounded-full"></span>
                <span className="w-9 h-9 bg-purple-800 rounded-full"></span>
                <span className="w-9 h-9 bg-black rounded-full"></span>
              </div>
            </div>
            <div className="border horizontal line my-2"></div>
            {/* size */}
            <div>
              <div className="flex items-center justify-between py-1">
                <span className="text-xl font-semibold">Size</span>
                <FaAngleUp className="text-gray-500" />
              </div>
              <div className="flex items-center justify-start text-white gap-2">
                <p className="px-3 py-[3px] bg-gray-400 rounded-full text-center cursor-pointer">
                  small
                </p>
                <p className="px-3 py-[3px] bg-gray-400 rounded-full cursor-pointer">
                  Medium
                </p>
                <p className="px-3 py-[3px] bg-gray-400 rounded-full cursor-pointer">
                  Large
                </p>
                <p className="px-3 py-[3px] bg-gray-400 rounded-full cursor-pointer">
                  3XL
                </p>
                <p className="px-3 py-[3px] bg-gray-400 rounded-full cursor-pointer">
                  4XL
                </p>
              </div>
            </div>
          </div>
          {/*  Apply filter Button */}
          <button
            className="border-0 w-4/5 text-center outline-none bg-blue-700 text-white px-4 py-1 rounded-full my-3
          "
          >
            Apply Filter
          </button>
        </div>
        {/* right side  */}
        <div className="right col-span-3 grid grid-cols-2 gap-4 mt-3">
          {(productData as Tproduct[]).map((product, i) => {
            return (
              <div
                className="card w-80 h-80 flex flex-col gap-2 border max-h-96 cursor-pointer"
                key={i}
              >
                <div className="img  h-56">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-2">
                  <div className="flex items-center gap-2 justify-between ">
                    <p className="text-base font-medium line-clamp-2">
                      {product.name}
                    </p>
                    <span className="bg-blue-700 p-1 text-white rounded-md">
                      <TiShoppingCart className="text-2xl" />
                    </span>
                  </div>
                  <p>Rs. {product.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
