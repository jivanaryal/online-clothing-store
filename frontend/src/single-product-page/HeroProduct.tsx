import { useParams } from "react-router-dom";
import productData from "../data/products.json";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";

const HeroProduct = () => {
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const product = productData.find((item) => item.id === id);

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(<IoIosStar key={i} />);
      } else if (rating > i) {
        stars.push(<IoIosStarHalf key={i} />);
      } else {
        stars.push(<IoIosStarOutline key={i} />);
      }
    }
    return stars;
  };

  // Function to handle quantity change
  const handleQuantityChange = (e: { target: { value: string } }) => {
    const value = Math.max(1, Math.min(15, parseInt(e.target.value) || 1));
    setCount(value);
  };

  // Calculate discounted price
  const discountedPrice = product
    ? (product.price - (product.price * product.discount) / 100).toLocaleString(
        "en-IN"
      )
    : 0;

  const originalPrice = product ? product.price.toLocaleString("en-IN") : 0;

  return (
    <div className="border md:grid grid-cols-2 gap-2">
      <div className="image h-[70vh]">
        <img
          src={product?.images[0]}
          alt={product?.name}
          className="h-full object-cover w-full"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="font-medium text-2xl line-clamp-2">{product?.name}</p>
        <div className="flex text-sm gap-2 items-center">
          {renderStars(product?.avgRating || 0)}
          <span>{product?.avgRating}</span>
          <span className="text-muted-foreground">
            ({product?.reviews.length})
          </span>
        </div>
        <div>
          <span className="text-gray-400">Brand :</span>{" "}
          <span className="text-blue-600">GoldStar</span>
        </div>
        <div className="border horizontal line"></div>
        <div className="py-4">
          <p className="font-medium text-2xl text-blue-600">
            Rs. {discountedPrice}
          </p>
          <div className="flex gap-2">
            <p className="text-gray-400 line-through">Rs. {originalPrice}</p>
            <p>{product?.discount}%</p>
          </div>
        </div>
        <div className="border horizontal line"></div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-gray-400">Color family : </p>
            <p className="text-sm text-gray-400">
              Please select the color option
            </p>
          </div>
        </div>
        <div className="h-14 w-14 cursor-pointer flex gap-2">
          {product?.images.map((imgs, i) => {
            return (
              <img
                key={i}
                src={imgs}
                alt="color"
                className="w-full h-full object-contain border hover:border-blue-600"
              />
            );
          })}
        </div>
        {/* quantity section */}
        <div className="flex gap-8 items-center py-3 ">
          <p className="text-gray-500">Quantity</p>
          <div className="flex items-center gap-2">
            <FaMinus
              className="text-gray-400 cursor-pointer"
              onClick={() => setCount(Math.max(1, count - 1))}
            />
            <input
              type="number"
              className="outline-none w-11 text-center"
              value={count}
              onChange={handleQuantityChange}
              min={1}
              max={15}
            />
            <FaPlus
              className="text-gray-400 cursor-pointer"
              onClick={() => setCount(Math.min(15, count + 1))}
            />
          </div>
        </div>
        {/* Add to cart and buy now button */}
        <div className="grid grid-cols-2 place-items-center justify-between text-white gap-3">
          <button className="bg-blue-600 w-full py-2 rounded-md">
            Add to Cart
          </button>
          <button className="w-full bg-green-600 py-2 rounded-md">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroProduct;
