import { useParams } from "react-router-dom";
import productData from "../data/products.json";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { PoundSterling } from "lucide-react";

const HeroProduct = () => {
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
  const discountedPrice = product
    ? product.price - (product.price * product.discount) / 100
    : 0;
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
        <div className="border"></div>
        <div className="">
          <p className="font-medium text-2xl">Rs. {discountedPrice}</p>
          <div className="flex gap-2">
            <p className="text-gray-400 line-through">Rs. {product?.price}</p>
            <p>{product?.discount}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroProduct;
