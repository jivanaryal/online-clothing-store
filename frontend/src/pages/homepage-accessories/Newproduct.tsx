import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { subWeeks } from 'date-fns'; // For date comparison

interface Product {
  product_id: number;
  name: string;
  imageURL: string;
  price: number;
  discount_percentage: number;
  created_at: string; // ISO string date
}

const Newproduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/ocs/products'); // Replace with your API endpoint
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
    const oneWeekAgo = subWeeks(new Date(), 1);
    return createdDate > oneWeekAgo;
  };

  // Filter products to only include those created within the last week
  const newProducts = products.filter(product => isNewProduct(product.created_at));

  return (
    <div className="p-4 w-11/12 mx-auto mt-32 mb-20 mr-4">
      <h1 className="text-3xl font-bold mb-6">New Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : newProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-12 ">
          {newProducts.map((product) => (
            <Link key={product.product_id} to={`products/${product.product_id}`} className="transform transition-transform duration-300 hover:scale-105">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
                {/* New badge */}
                {isNewProduct(product.created_at) && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    New
                  </span>
                )}
                <div className="relative">
                  <img
                    src={`http://localhost:5001${product.imageURL}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
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
                      <p className="text-xl font-bold text-blue-600">
                        Rs. {product.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No new products available.</p>
      )}
    </div>
  );
};

export default Newproduct;
