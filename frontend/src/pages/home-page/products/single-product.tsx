import { Tproduct } from "@/types/product";
import { Link } from "react-router-dom";

type Props = {
  product: Tproduct;
};

const SingleProduct = ({ product }: Props) => {
  return (
    <Link to={`/products/${product.product_id}`}>
      <div className="max-h-80 p-1 border rounded-md hover:shadow-lg cursor-pointer">
        <div className="image h-44 rounded-md">
          <img
            src={product.images[0]}
            sizes={"100vw"}
            alt=""
            className="h-full w-full object-cover rounded-md"
          />
        </div>

        <div className="content text-black p-1">
          <p className="text-lg line-clamp-2 leading-5">{product.name}</p>
          <p className="text-xl font-semibold text-blue-600">
            Rs.{" "}
            {product.price -
              (product.price * product.discount_percentage) / 100}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-gray-600 line-through">Rs. {product.price}</p>
            <p>{product.discount_percentage}%</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleProduct;
