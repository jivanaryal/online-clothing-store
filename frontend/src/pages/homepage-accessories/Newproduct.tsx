import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from 'react-icons/io';

interface Product {
  product_id: number;
  name: string;
  imageURL: string;
  price: number;
  discount_percentage: number | null;
  created_at: string;
  review_rating: number | null; // review_rating can be null
}

const Newproduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/ocs/products/all');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const isNewProduct = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return createdDate > oneDayAgo;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(<IoIosStar key={i} className="text-yellow-500" />);
      } else if (rating > i) {
        stars.push(<IoIosStarHalf key={i} className="text-yellow-500" />);
      } else {
        stars.push(<IoIosStarOutline key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  const newProducts = products.filter((product) => isNewProduct(product.created_at));

  return (
    <div className="p-8  w-11/12 mx-auto">
      <h1 className="text-4xl font-bold mb-8  text-gray-900">New Arrivals</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : newProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {newProducts.map((product) => (
            <Link
              key={product.product_id}
              to={`products/${product.product_id}`}
              className="transform transition-transform duration-300 "
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
                {isNewProduct(product.created_at) && (
                  <span className="absolute z-50 top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    New
                  </span>
                )}
                <img
                  src={`http://localhost:5001${product.imageURL}`}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                  <div className="flex items-center mt-2 mb-2">
                    {product.discount_percentage && product.discount_percentage > 0 ? (
                      <>
                        <p className="text-xl font-bold text-blue-600">
                          Rs. {product.price - (product.price * product.discount_percentage) / 100}
                        </p>
                        <p className="text-sm text-gray-500 line-through ml-2">
                          Rs. {product.price}
                        </p>
                      </>
                    ) : (
                      <p className="text-xl font-bold text-blue-600">Rs. {product.price}</p>
                    )}
                  </div>

                  {/* Display Product Rating with Stars */}
                  {product.review_rating !== null && (
                    <div className="flex items-center">
                      {renderStars(product.review_rating)}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No new products available.</p>
      )}
    </div>
  );
};

export default Newproduct;
