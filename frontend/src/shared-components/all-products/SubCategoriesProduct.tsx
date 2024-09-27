import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RatingStars } from '@/utils/ratingStars';
import { AiOutlineGroup, AiOutlineUnorderedList } from 'react-icons/ai';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageURL: string[];
  discount_percentage: number;
  review_rating: number;
  brand: string;
  category_id: number;
  color: string;
}

const SubcategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<string>('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [noProductsMessage, setNoProductsMessage] = useState<string>('');

  const subcategory_id = id;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setProducts([]);
      setNoProductsMessage('');

      try {
        const res = await axios.get(`http://localhost:5001/api/ocs/subcategories/new/${subcategory_id}`);
        if (res.data.length === 0) {
          setNoProductsMessage('No products available for this subcategory.');
        } else {
          setProducts(res.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setNoProductsMessage('No products available for this subcategory.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [subcategory_id]);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    
    if (sortOrder === 'low-to-high') {
      return priceA - priceB;
    } else if (sortOrder === 'high-to-low') {
      return priceB - priceA;
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-6 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-center mb-4">Our Products</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setViewType('grid')} aria-label="Grid view">
            <AiOutlineGroup className={`w-6 h-6 ${viewType === 'grid' ? 'text-blue-600' : 'text-gray-600'}`} />
          </button>
          <button onClick={() => setViewType('list')} aria-label="List view">
            <AiOutlineUnorderedList className={`w-6 h-6 ${viewType === 'list' ? 'text-blue-600' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-700 text-center">Loading...</p>
      ) : noProductsMessage ? (
        <p className="text-gray-700 text-center">{noProductsMessage}</p>
      ) : viewType === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Link key={product.product_id} to={`/products/${product.product_id}`}>
              <div className="p-4 border rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 duration-300">
                <div className="h-60 mb-2">
                  <img
                    src={`http://localhost:5001${product.imageURL[0]}`} 
                    alt={product.name}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="content text-black">
                  <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
                  {product.discount_percentage > 0 ? (
                    <div className="flex flex-col">
                      <p className="text-xl font-semibold text-blue-600">
                        Rs. {parseFloat(product.price) - (parseFloat(product.price) * product.discount_percentage) / 100}
                      </p>
                      <p className="text-gray-600 line-through">Rs. {product.price}</p>
                    </div>
                  ) : (
                    <p className="text-xl font-semibold text-blue-600">Rs. {product.price}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-6">
          {sortedProducts.map((product) => (
            <Link key={product.product_id} to={`/products/${product.product_id}`} className="flex border rounded-lg p-8 hover:bg-gray-100 bg-white transition-colors duration-300 shadow-md">
              <img
                src={`http://localhost:5001${product.imageURL[0]}`} 
                alt={product.name}
                className="h-32 w-32 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
                {product.discount_percentage > 0 ? (
                  <div className="flex flex-col">
                    <p className="text-xl font-semibold text-blue-600">
                      Rs. {parseFloat(product.price) - (parseFloat(product.price) * product.discount_percentage) / 100}
                    </p>
                    <p className="text-gray-600 line-through">Rs. {product.price}</p>
                  </div>
                ) : (
                  <p className="text-xl font-semibold text-blue-600">Rs. {product.price}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubcategoryProducts;
