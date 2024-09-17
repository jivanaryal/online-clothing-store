import React, { useState } from 'react';

const Rating: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (rating && comment) {
           console.log(rating,comment)
      setSubmitted(true); // Show confirmation message
      setRating(null); // Reset rating
      setComment(''); // Reset comment
    }
  };

  return (
    <div className="flex flex-col mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold my-5">What do you think about this product?</h1>

      <b className="mb-3">Please Rate this product</b>
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            className={`text-3xl cursor-pointer ${
              (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
            }`}
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
    </div>
  );
};

export default Rating;
