import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Rating: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [existingRatings, setExistingRatings] = useState<any[]>([]); // For viewing existing ratings/comments

  // Get product_id from the URL params
  const { id } = useParams();
  const product_id = id;

  // Get ConsumerID from localStorage
  const CustomerID = localStorage.getItem("CustomerID");

  // Fetch user authentication status
  const fetchAuth = async () => {
    try {
      if (!CustomerID) {
        console.error('ConsumerID not found in localStorage');
        return;
      }

      // Make an API request with product_id and ConsumerID as params
      const res = await axios.get("http://localhost:5001/api/ocs/reviews/auth", {
        params: {
          product_id: product_id,
          ConsumerID: CustomerID,
        },
      });

      // Handle the response
      if (res.status === 200) {
        setIsAuth(res.data);  // Assuming the response determines the authentication status
      }
    } catch (error) {
      console.error('Error fetching auth data:', error);
    }
  };

  // Fetch existing ratings and comments for the product
  const fetchRatings = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/ocs/reviews/${product_id}`);
      if (res.status === 200) {
        setExistingRatings(res.data); // Assuming response contains ratings/comments
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  // useEffect runs once when the component loads to send the request
  useEffect(() => {
    fetchAuth();
    fetchRatings();
  }, [product_id, CustomerID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating !== null && comment) {
      try {
        // Submit the rating and comment to the API
        await axios.post("http://localhost:5001/api/ocs/reviews/here", {
          product_id,
          customer_id: CustomerID,
          rating,
          comment,
        });
        setSubmitted(true); // Show confirmation message
        setRating(null); // Reset rating
        setComment(''); // Reset comment
        fetchRatings(); // Refresh the ratings list
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    }
  };

  return (
    <div className="flex flex-col mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold my-5">What do you think about this product?</h1>

      {/* Display existing ratings and comments */}
      <div className="mb-6">
        <h2 className="text-lg font-bold">User Reviews:</h2>
        {existingRatings.length > 0 ? (
          existingRatings.map((review, index) => (
            <div key={index} className="mb-4 p-3 border-b border-gray-300">
              <div className="flex items-center mb-2">
                <span className="font-semibold">Rating: {review.rating} / 5</span>
              </div>
              <p className="text-sm">{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </div>

      {/* Show rating and comment form only if the user is authenticated */}
      {isAuth ? (
        <>
          <b className="mb-3">Please Rate this product</b>
          <div className="flex mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-3xl cursor-pointer ${(hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              >
                ★
              </button>
            ))}
          </div>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-left text-sm font-medium text-gray-700">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Leave your comment here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700"
            >
              Submit Rating
            </button>
          </form>

          {submitted && (
            <div className="mt-5 text-green-600">
              <p>Thank you! Your rating and comment have been submitted.</p>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-600">You must purchase this product to leave a rating and comment.</p>
      )}
    </div>
  );
};

export default Rating;
