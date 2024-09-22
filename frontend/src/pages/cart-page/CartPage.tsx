import SecondNav from "@/shared-components/navbar/SecondNav";
import TopNav from "@/shared-components/navbar/TopNav";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItem, setCartItem] = useState([]);
  const id = localStorage.getItem("CustomerID");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:5001/api/ocs/carts/all/${id}`);
        setCartItem(res.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
    fetchData();
  }, [id]);

  // Function to remove item from the cart
  const removeFromCart = async (ids) => {
    try {
      await axios.delete(`http://localhost:5001/api/ocs/carts/items/${ids}`);
      setCartItem((prevItems) => prevItems.filter((item) => item.id !== ids));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <TopNav />
      <SecondNav />

      <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Cart</h1>

        {cartItem.length === 0 ? (
          <div className="flex justify-center">
            <p className="text-lg text-gray-600">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {cartItem.map((item) => (
              <div
                key={item.product_id}
                className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center space-x-6 cursor-pointer" onClick={() => navigate(`/products/${item.product_id}`)}>
                  {/* Product Image */}
                  {item.product_imageURL && item.product_imageURL.length > 0 && (
                    <img
                      src={`http://localhost:5001${item.product_imageURL[0]}`}
                      alt={item.product_name}
                      className="w-28 h-28 object-cover rounded-md"
                    />
                  )}

                  {/* Product Info */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{item.product_name}</h2>
                    <p className="text-gray-600">Brand: {item.product_brand}</p>
                    <p className="text-gray-600">Price: ${item.product_price}</p>
                    <p className="text-gray-600">Color: {item.product_color}</p>
                    <p className="text-gray-600">Size: {item.product_size}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>

                {/* Remove Button */}
                <div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
