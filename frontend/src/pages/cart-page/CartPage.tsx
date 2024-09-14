import SecondNav from "@/shared-components/navbar/SecondNav";
import TopNav from "@/shared-components/navbar/TopNav";
import axios from "axios";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItem, setCartItem] = useState([]);
  const id = localStorage.getItem("CustomerID");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:5001/api/ocs/carts/customer/${id}`);
        console.log(res.data);
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
    <div>
         <TopNav/>
         <SecondNav />
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItem.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItem.map((item) => (
            <div>
               
            <div
              key={item.product_id}
              className="bg-white shadow-lg rounded-lg flex p-6 items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                {item.product_imageURL && item.product_imageURL.length > 0 && (
                  <img
                    src={`http://localhost:5001${item.product_imageURL[0]}`}
                    alt={item.product_name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}

                {/* Product Info */}
                <div>
                  <h2 className="text-xl font-semibold">{item.product_name}</h2>
                  <p className="text-gray-500">Brand: {item.product_brand}</p>
                  <p className="text-gray-500">Price: ${item.product_price}</p>
                  <p className="text-gray-500">Color: {item.product_color}</p>
                  <p className="text-gray-500">Size: {item.product_size}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>

              {/* Remove Button */}
              <div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
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
