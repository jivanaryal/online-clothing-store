// src/components/RecommendedProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Recommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            // Retrieve CustomerID from localStorage
            const customerID = localStorage.getItem('CustomerID');
            if (!customerID) {
                setError('No customer ID found in local storage');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5001/api/auth/ocs/customers/recommendations/${customerID}`);
                setRecommendations(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    useEffect(() => {
        const fetchProductDetails = async () => {
            if (recommendations.length > 0) {
                try {
                    const productFetchPromises = recommendations.map(rec => 
                        axios.get(`http://localhost:5001/api/ocs/products/${rec.item}`)
                    );

                    const productResponses = await Promise.all(productFetchPromises);
                    const productData = productResponses.reduce((acc, response) => {
                        acc[response.data.product_id] = response.data;
                        return acc;
                    }, {});
                    
                    setProductDetails(productData);
                } catch (err) {
                    setError(err.message);
                }
            }
        };

        fetchProductDetails();
    }, [recommendations]);

    if (loading) return <div>Loading recommendations...</div>;
    if (error) return <div>Error fetching recommendations: {error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
            {recommendations.length === 0 ? (
                <p>No recommendations available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((recommendation) => {
                        const product = productDetails[recommendation.item];
                        return product ? (
                            <Link key={recommendation.item} to={`/products/${product.product_id}`} className="no-underline">
                                <div className="border rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow duration-200">
                                    <img
                                        src={`http://localhost:5001${product.imageURL[0]}`} // Assuming imageURL is an array
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                    <p className="text-gray-700 mb-2">{product.description}</p>
                                    <div className="flex items-center mb-2">
                                        <span className="text-lg font-bold text-blue-600">${product.price}</span>
                                        {product.discount_percentage && (
                                            <span className="ml-2 text-sm text-red-500 line-through">
                                                ${parseFloat(product.price) * (1 + parseFloat(product.discount_percentage) / 100)}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-500 mb-1">Average Rating: {product.avgRating}</p>
                                    <p className="text-gray-500 mb-1">Review Count: {product.review_count}</p>
                                    <p className="text-gray-500 mb-4">Stock: {product.stockQuantity}</p>
                                  
                                </div>
                            </Link>
                        ) : null;
                    })}
                </div>
            )}
        </div>
    );
};

export default Recommendation;
