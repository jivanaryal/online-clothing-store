import SecondNav from "@/shared-components/navbar/SecondNav";
import TopNav from "@/shared-components/navbar/TopNav";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa"; // Icons for the buttons

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

  // Function to update the quantity of a cart item
  const updateCartQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    try {
      await axios.patch(`http://localhost:5001/api/ocs/carts/items`, {
        cart_id:itemId,
        quantity: newQuantity,
      });
      setCartItem((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

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
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <TopNav />
      <SecondNav />

      <div className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          Your Shopping Cart
        </h1>

        {cartItem.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-lg font-medium text-gray-500">
              Your cart is currently empty.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {cartItem.map((item) => (
              <div
                key={item.product_id}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0 hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className="flex items-center space-x-6 cursor-pointer"
                  // onClick={() => navigate(`/products/${item.product_id}`)}
                >
                  {/* Product Image */}
                  {item.product_imageURL && item.product_imageURL.length > 0 && (
                    <img
                      src={`http://localhost:5001${item.product_imageURL[0]}`}
                      alt={item.product_name}
                      className="w-32 h-32 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105"
                    />
                  )}

                  {/* Product Info */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                      {item.product_name}
                    </h2>
                    <p className="text-gray-500">Price: ${item.product_price}</p>
                    <p className="text-gray-500">Size: {item.product_size}</p>

                    {/* Quantity with Increase/Decrease Buttons */}
                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300"
                      >
                        <FaMinus />
                      </button>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
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
