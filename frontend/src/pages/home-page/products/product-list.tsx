import { Tproduct } from "@/types/product";
import SingleProduct from "./single-product";
import ProductData from "@/data/products.json";
import { Link } from "react-router-dom";
type props = {
  varient: string;
};

type productType = {
  product: Tproduct;
};
const ProductList = ({ varient }: props) => {
  return (
    <div className="">
      {varient === "similar-product" ? (
        <SimilarProduct />
      ) : varient === "all-product" ? (
        <AllProducts />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {(ProductData as Tproduct[]).map((product, i) => {
            return (
              <div key={i}>
                <SingleProduct product={product} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;

// similar products
function SimilarProduct() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
      {(ProductData as Tproduct[]).map((product, i) => {
        return (
          <div key={i}>
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
                  Rs. {product.price - (product.price * product.discount) / 100}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 line-through">
                    Rs. {product.price}
                  </p>
                  <p>{product.discount}%</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

//  All products
function AllProducts() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {(ProductData as Tproduct[]).map((product, i) => {
        return (
          <Link to={`products/${product.id}`}>
            <div key={i}>
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
                  <p className="text-lg line-clamp-2 leading-5">
                    {product.name}
                  </p>
                  <p className="text-xl font-semibold text-blue-600">
                    Rs.{" "}
                    {product.price - (product.price * product.discount) / 100}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-600 line-through">
                      Rs. {product.price}
                    </p>
                    <p>{product.discount}%</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
