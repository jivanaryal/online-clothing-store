export const RatingStars = ({ rating }: { rating: number }) => {
    const starCount = Math.round(rating); // Assuming rating is out of 5 stars
    const stars = Array(5).fill(0).map((_, i) => (
      <span key={i} className={`inline-block ${i < starCount ? 'text-yellow-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
    return <div>{stars}</div>;
  };