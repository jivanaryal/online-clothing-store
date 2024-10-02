import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser, FaStar } from 'react-icons/fa';

const Rating: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const [existingRatings, setExistingRatings] = useState<any[]>([]);

  const { id } = useParams();
  const product_id = id;

  const CustomerID = localStorage.getItem("CustomerID");

  const fetchAuth = async () => {
    try {
      if (!CustomerID) {
        console.error('CustomerID not found in localStorage');
        return;
      }
      const res = await axios.get("http://localhost:5001/api/ocs/reviews/auth", {
        params: {
          product_id: product_id,
          ConsumerID: CustomerID,
        },
      });
      if (res.status === 200) {
        setIsAuth(res.data);
      }
    } catch (error) {
      console.error('Error fetching auth data:', error);
    }
  };

  const fetchHasReviewed = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/ocs/reviews/check/${product_id}/${CustomerID}`);
      if (res.status === 200) {
        setHasReviewed(res.data.hasReviewed);
      }
    } catch (error) {
      console.error('Error checking review status:', error);
    }
  };

  const fetchRatings = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/ocs/reviews/${product_id}`);
      if (res.status === 200) {
        setExistingRatings(res.data);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  useEffect(() => {
    fetchAuth();
    fetchHasReviewed();
    fetchRatings();
  }, [product_id, CustomerID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating !== null && comment) {
      try {
        await axios.post("http://localhost:5001/api/ocs/reviews/here", {
          product_id,
          customer_id: CustomerID,
          rating,
          comment,
        });
        setSubmitted(true);
        setRating(null);
        setComment('');
        fetchRatings();
        location.reload();
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    }
  };

  return (
    <div className="flex flex-col  p-6 bg-gray-100 rounded-lg shadow-lg w-full mx-10">
      <h1 className="text-xl font-bold mb-5">What do you think about this product?</h1>

      <div className="mb-6">
        <h2 className="text-lg font-bold">User Reviews:</h2>
        {existingRatings.length > 0 ? (
          existingRatings.map((review, index) => (
            <div key={index} className="flex items-start mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="mr-4">
                <FaUser className="text-3xl text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-lg font-semibold">
                      {review.FirstName} {review.LastName}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        className={starIndex < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{review.rating} / 5</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic">"{review.comment}"</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </div>

      {isAuth ? (
        hasReviewed ? (
          <p className="text-sm text-gray-600">You have already rated this product.</p>
        ) : (
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
        )
      ) : (
        <p className="text-sm text-gray-600">You must purchase this product to leave a rating and comment.</p>
      )}
    </div>
  );
};

export default Rating;
