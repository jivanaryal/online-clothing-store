import { useState, useEffect } from "react";
import { Tproduct } from "@/types/product";
import SingleProduct from "./single-product";
import { Link } from "react-router-dom";
import { RatingStars } from "@/utils/ratingStars";

type Props = {
  varient: string;
};

const ProductList = ({ varient }: Props) => {
  const [products, setProducts] = useState<Tproduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/ocs/products/all`
        );
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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-11/12 mx-auto mt-20 mb-20 mr-4">
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
      <div>
       
    <div className="grid grid-cols-2 bg-red-500 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
      {products.map((product, i) => (
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
              {product.discount_percentage > 0 && (
                <p className="text-xl font-semibold text-blue-600">
                  Rs. {product.price - (product.price * product.discount) / 100}
                </p>
              )}
              {product.discount > 0 && (
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 line-through">
                    Rs. {product.price}
                  </p>
                  <p>{product.discount}%</p>
                </div>
              )}
              {product.avgRating > 0 && (
                <div className="flex items-center gap-2">
                  {/* Render stars here */}
                  <span>{product.avgRating}</span>
                  <span className="text-muted-foreground">
                    ({product.reviews.length} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

// all products
type AllProductsProps = {
  products: Tproduct[];
};

function AllProducts({ products }: AllProductsProps) {
  return (
    
<div>
    <h1 className="text-3xl font-bold mb-6">For You</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 p-4">
      
    {products.map((product) => (
      <Link key={product.product_id} to={`products/${product.product_id}`} className="transform transition-transform duration-300 hover:scale-105">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="relative">
            <img
              src={`http://localhost:5001${product.imageURL}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {product.discount_percentage > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount_percentage}% OFF
              </span>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
            <div className="flex items-center mt-2 mb-2">
              {product.discount_percentage > 0 ? (
                <>
                  <p className="text-xl font-bold text-blue-600">
                    Rs. {product.price - (product.price * product.discount_percentage) / 100}
                  </p>
                  <p className="text-sm text-gray-500 line-through ml-2">
                    Rs. {product.price}
                  </p>
                </>
              ) : (
                <p className="text-xl font-bold text-orange-400">
                  Rs. {product.price}
                </p>
              )}
            </div>
            
            {/* {product.review_rating?.length > 0 ? (
              <div className="flex items-center text-sm text-gray-600">
                <RatingStars rating={product.review_rating.length} />
                <span className="ml-2">({product.review_rating.length} reviews)</span>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No reviews</p>
            )} */}
          </div>
        </div>
      </Link>
    ))}
  </div>
  </div>
  );
}
