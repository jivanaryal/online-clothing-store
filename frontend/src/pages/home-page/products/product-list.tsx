import { useState, useEffect } from "react";
import { Tproduct } from "@/types/product";
import SingleProduct from "./single-product";
import { Link } from "react-router-dom";
import { RatingStars } from "@/utils/ratingStars";

type Props = {
  varient: string;
  product_id?: string; // Add product_id as an optional prop
};

const ProductList = ({ varient, product_id }: Props) => {
  const [products, setProducts] = useState<Tproduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "";
        if (varient === "similar-product" && product_id) {
          url = `http://localhost:5001/api/ocs/products/similar/${product_id}`;
        } else {
          url = `http://localhost:5001/api/ocs/products/all`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data: Tproduct[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [varient, product_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 mt-20 mb-20 mr-4">
      {varient === "similar-product" ? (
        <SimilarProduct products={products} />
      ) : varient === "all-product" ? (
        <AllProducts products={products} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product, i) => (
            <div key={i}>
              <SingleProduct product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

type SimilarProductProps = {
  products: Tproduct[];
};

function SimilarProduct({ products }: SimilarProductProps) {
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-4xl font-bold mb-8 text-gray-900">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link key={product.product_id} to={`/products/${product.product_id}`} className="group no-underline">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={`http://localhost:5001${product.imageURL[0]}`}
                alt={product.name}
                className="w-full h-56 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  {product.discount_percentage && (
                    <span className="text-sm text-gray-400 line-through">
                      ${(
                        parseFloat(product.price) *
                        (1 + parseFloat(product.discount_percentage) / 100)
                      ).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className={`text-sm ${product.stockQuantity > 0 ? "text-green-500" : "text-red-500"}`}>
                    {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                  <div className="ml-2 flex items-center">
                    <span className="text-yellow-500">{"★".repeat(Math.floor(product.avgRating))}</span>
                    {/* <span className="text-gray-400">{` (${product.review_count})`}</span> */}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

type AllProductsProps = {
  products: Tproduct[];
};

function AllProducts({ products }: AllProductsProps) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const discountedProducts = products.filter((product) => {
    const discountStartDate = new Date(product.discount_start_date);
    const discountEndDate = new Date(product.discount_end_date);

    return product.discount_percentage > 0 && discountStartDate <= currentDate && discountEndDate >= currentDate;
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Flash Sale</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4">
        {discountedProducts.length > 0 ? (
          discountedProducts.map((product) => (
            <Link
              key={product.product_id}
              to={`products/${product.product_id}`}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={`http://localhost:5001${product.imageURL}`}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount_percentage}% OFF
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                  <div className="flex items-center mt-2 mb-2">
                    <p className="text-xl font-bold text-blue-600">
                      Rs. {product.price - (product.price * product.discount_percentage) / 100}
                    </p>
                    <p className="text-sm text-gray-500 line-through ml-2">Rs. {product.price}</p>
                  </div>
                  {product.review_rating?.length > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <RatingStars rating={product.review_rating} />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No discounted products available.</p>
        )}
      </div>
    </div>
  );
}
