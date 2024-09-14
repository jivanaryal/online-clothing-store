import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // Use string if price is a string in the response
  imageURL: string; // Assuming the API returns the image URL
  discount_percentage: number;
  review_rating: number;
}

const SubcategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const subcategory_id = id;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:5001/api/ocs/subcategories/new/${subcategory_id}`);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [subcategory_id]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products available for this subcategory.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`products/${product.id}`}>
              <div className="max-h-80 p-1 border rounded-md hover:shadow-lg cursor-pointer">
                <div className="image h-44 rounded-md">
                  <img
                    src={`http://localhost:5001${product.imageURL}`} // Adjust this based on the actual response data
                    alt={product.name}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="content text-black p-1">
                  <p className="text-lg line-clamp-2 leading-5">{product.name}</p>

                  {product.discount_percentage > 0 ? (
                    <>
                      <p className="text-xl font-semibold text-blue-600">
                        Rs. {product.price - (product.price * product.discount_percentage) / 100}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-600 line-through">Rs. {product.price}</p>
                        <p>{product.discount_percentage}%</p>
                      </div>
                    </>
                  ) : (
                    <p className="text-xl font-semibold text-blue-600">Rs. {product.price}</p>
                  )}

                  {product.review_rating > 0 ? (
                    <div className="flex items-center gap-2">
                      {/* Assuming you have a RatingStars component */}
                      <RatingStars rating={product.review_rating} />
                      <span className="text-muted-foreground">({product.review_rating} reviews)</span>
                    </div>
                  ) : (
                    <p className="text-gray-600">No reviews</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubcategoryProducts;
