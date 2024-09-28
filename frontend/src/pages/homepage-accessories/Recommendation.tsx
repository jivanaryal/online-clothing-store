import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Recommendation = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            const customerID = localStorage.getItem('CustomerID');
            if (!customerID) {
               
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

    if (loading) return <div className="text-center text-lg mt-12">Loading recommendations...</div>;
    if (error) return <div className="text-center text-lg text-red-500 mt-12">Error fetching recommendations: {error}</div>;

    // Check if user is logged in and recommendations exist
    const customerID = localStorage.getItem('CustomerID');
    if (!customerID || recommendations.length === 0) {
        return <div className="text-center text-lg mt-12"></div>;
    }

    return (
        <div className="p-8 bg-white">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Just For You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {recommendations.map((recommendation) => {
                    const product = productDetails[recommendation.item];
                    return product ? (
                        <Link key={recommendation.item} to={`/products/${product.product_id}`} className="group no-underline">
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
                                <div className="relative">
                                    <img
                                        src={`http://localhost:5001${product.imageURL[0]}`}
                                        alt={product.name}
                                        className="w-full h-72 object-cover rounded-t-lg"
                                    />
                                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
                                        For You
                                    </div>
                                    {product.discount_percentage && (
                                        <div className="absolute top-12 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            {product.discount_percentage}% OFF
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                                        {product.discount_percentage && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ${(parseFloat(product.price) * (1 + parseFloat(product.discount_percentage) / 100)).toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        <p>Rating: {product.avgRating} ★</p>
                                        <p>Reviews: {product.review_count}</p>
                                        <p className={`mt-1 ${product.stockQuantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                            {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default Recommendation;
