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
    <div className="">
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
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
  );
}

// all products
type AllProductsProps = {
  products: Tproduct[];
};

function AllProducts({ products }: AllProductsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {products.map((product, i) => (
        <Link key={i} to={`products/${product.product_id}`}>
          <div>
            <div className="max-h-80 p-1 border rounded-md hover:shadow-lg cursor-pointer">
              <div className="image h-44 rounded-md">
                <img
                  src={`http://localhost:5001${product.imageURL}`}
                  sizes={"100vw"}
                  alt=""
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
              <div className="content text-black p-1">
                <p className="text-lg line-clamp-2 leading-5">{product.name}</p>

                {product.discount_percentage > 0 ? (
                  <>
                    <p className="text-xl font-semibold text-blue-600">
                      Rs.{" "}
                      {product.price -
                        (product.price * product.discount_percentage) / 100}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600 line-through">
                        Rs. {product.price}
                      </p>
                      <p>{product.discount_percentage}%</p>
                    </div>
                  </>
                ) : (
                  <p className="text-xl font-semibold text-blue-600">
                    Rs. {product.price}
                  </p>
                )}
                <div>{console.log(product)}</div>
                {product.review_rating > 0 ? (
                  <div className="flex items-center gap-2">
                    <RatingStars rating={product.review_rating} />
                    <span className="text-muted-foreground">
                      ({product.review_rating.length + 1} reviews)
                    </span>
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews</p>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
