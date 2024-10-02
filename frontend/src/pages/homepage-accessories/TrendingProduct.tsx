import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TrendingProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the provided URL
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/ocs/orders/trending/products');
        setProducts(response.data); // assuming the API returns an array of products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending products:', error);
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold">Loading Trending Products...</div>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold  mb-8">Trending Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <>
            <Link to={`/products/${product.product_id}`} key={product.product_id}>
              <div
                
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
            <img
                src={`http://localhost:5001${product.imageURL}`}
                alt={product.product_name}
              className="w-full h-64 object-cover rounded-lg"
              />
              {console.log(product)}
            <div className="mt-4">
              <h2 className="text-lg font-semibold">{product.product_name}</h2>
              {/* <p className="text-gray-500 mt-2">Orders: {product.total_quantity_sold}</p> */}
              <p className="text-blue-600 font-semibold mt-2">${product.price}</p>
            </div>
          </div>
            </Link>
            </>
        ))}
      </div>
    </div>
  );
};

export default TrendingProduct;
