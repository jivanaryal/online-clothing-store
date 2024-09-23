import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { RatingStars } from '@/utils/ratingStars';
import { AiOutlineGroup, AiOutlineUnorderedList } from 'react-icons/ai'; // Import icons

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
  const [noProductsMessage, setNoProductsMessage] = useState<string>(''); // New state for message

  const subcategory_id = id;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setProducts([]);  // Clear products when switching subcategories
      setNoProductsMessage('');  // Clear message when switching subcategories
      
      try {
        const res = await axios.get(`http://localhost:5001/api/ocs/subcategories/new/${subcategory_id}`);
        if (res.data.length === 0) {
          setNoProductsMessage('No products available for this subcategory.'); // Set no products message
        } else {
          setProducts(res.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setNoProductsMessage('No products available for this  subcategory.'); // Handle error message
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
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="flex items-center justify-between mb-4">
        <div>
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded"
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
        <p>Loading...</p>
      ) : noProductsMessage ? (
        <p>{noProductsMessage}</p> // Display message when no products are found
      ) : viewType === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.product_id}`}>
              <div className="max-h-80 p-4 border rounded-md hover:shadow-lg cursor-pointer bg-white transition-shadow duration-300">
                <div className="image h-44 rounded-md mb-2">
                  <img
                    src={`http://localhost:5001${product.imageURL[0]}`} 
                    alt={product.name}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="content text-black">
                  <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  {product.discount_percentage > 0 ? (
                    <>
                      <p className="text-xl font-semibold text-blue-600">
                        Rs. {parseFloat(product.price) - (parseFloat(product.price) * product.discount_percentage) / 100}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-600 line-through">Rs. {product.price}</p>
                      </div>
                    </>
                  ) : (
                    <p className="text-xl font-semibold text-blue-600">Rs. {product.price}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {sortedProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.product_id}`} className="flex border rounded-md p-4 hover:shadow-lg bg-white transition-shadow duration-300">
              <img
                src={`http://localhost:5001${product.imageURL[0]}`} 
                alt={product.name}
                className="h-24 w-24 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                {product.discount_percentage > 0 ? (
                  <>
                    <p className="text-xl font-semibold text-blue-600">
                      Rs. {parseFloat(product.price) - (parseFloat(product.price) * product.discount_percentage) / 100}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-600 line-through">Rs. {product.price}</p>
                    </div>
                  </>
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

