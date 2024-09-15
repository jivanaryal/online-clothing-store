import { useParams, useNavigate } from "react-router-dom";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

const HeroProduct = () => {
  const [product, setProduct] = useState<any>(null); // Update type as needed
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(1);
  const [showPayPal, setShowPayPal] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/ocs/products/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  const handleBuyNow = () => {
    setShowPayPal(true);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i + 1) {
        stars.push(<IoIosStar key={i} />);
      } else if (rating > i) {
        stars.push(<IoIosStarHalf key={i} />);
      } else {
        stars.push(<IoIosStarOutline key={i} />);
      }
    }
    return stars;
  };

  const handleQuantityChange = (e: { target: { value: string } }) => {
    const value = Math.max(1, Math.min(15, parseInt(e.target.value) || 1));
    setCount(value);
  };

  // Function to handle Add to Cart
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page with the return path as state
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    try {
      // Fetch or create cart
      const response = await axios.get(
        `http://localhost:5001/api/ocs/carts/customer/${localStorage.getItem(
          "CustomerID"
        )}`
      );
      const cartId = response.data.cart_id;

      // Add item to cart
      await axios.post("http://localhost:5001/api/ocs/carts/items", {
        cart_id: 1,
        product_id: product.product_id,
        quantity: count,
      });

      // Redirect to cart page
      navigate("/cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const originalPrice = product?.price || 0;
  const discountedPrice = product
    ? product.price - (product.price * product.discount_percentage) / 100
    : 0;

  // Calculate total price based on the selected quantity
  let totalPrice:number = discountedPrice * count;

  console.log(totalPrice)

  const handlePaymentSuccess = async (orderId: string) => {
    try {
      // Replace with your backend API endpoint
      await axios.post('http://localhost:5001/api/ocs/orders', {
        customerId: localStorage.getItem("CustomerID"),
        productId: product.product_id,
        quantity: count,
        totalPrice: totalPrice
      });
      alert('Order placed successfully!');
     
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };



  return (
    <div className="border md:grid grid-cols-2 gap-2">
      <div className="image h-[70vh]">
        <img
          src={`http://localhost:5001${product?.imageURL[0]}`} // Adjusted image URL
          alt={product?.name}
          className="h-full object-cover w-full"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="font-medium text-2xl line-clamp-2">{product?.name}</p>
        <div className="flex text-sm gap-2 items-center text-yellow-400">
          {renderStars(product?.avgRating || 0)}
          <span>{product?.avgRating || "No rating"}</span>
        </div>
        <div>
          <span className="text-gray-400">Brand :</span>{" "}
          <span className="text-blue-600">{product?.brand || "Unknown"}</span>
        </div>
        <div className="border horizontal line"></div>
        <div className="py-4">
          {/* Update the total price dynamically */}
          <p className="font-medium text-2xl text-blue-600">
            Rs. {totalPrice.toLocaleString("en-IN")}
          </p>
          {product?.discount_percentage > 0 && (
            <div className="flex gap-2">
              <p className="text-gray-400 line-through">Rs. {originalPrice}</p>
              <p className="text-red-500">{product?.discount_percentage}%</p>
            </div>
          )}
        </div>
        <div className="border horizontal line"></div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-gray-400">Color family : </p>
            <p className="text-sm text-gray-400">
              Please select the color option
            </p>
          </div>
        </div>
        <div className="h-14 w-14 cursor-pointer flex gap-2">
          {product?.imageURL.map((imgs: string, i: number) => (
            <img
              key={i}
              src={`http://localhost:5001${imgs}`} // Adjusted image URL
              alt="color"
              className="w-full h-full object-contain border hover:border-blue-600"
            />
          ))}
        </div>
        {/* Quantity section */}
        <div className="flex gap-8 items-center py-3">
          <p className="text-gray-500">Quantity</p>
          <div className="flex items-center gap-2">
            <FaMinus
              className="text-gray-400 cursor-pointer"
              onClick={() => setCount(Math.max(1, count - 1))}
            />
            <input
              type="number"
              className="outline-none w-11 text-center"
              value={count}
              onChange={handleQuantityChange}
              min={1}
              max={15}
            />
            <FaPlus
              className="text-gray-400 cursor-pointer"
              onClick={() => setCount(Math.min(15, count + 1))}
            />
          </div>
        </div>
        {/* Add to cart and buy now button */}
        <div className="grid grid-cols-2 place-items-center justify-between text-white gap-3">
          <button
            className="bg-blue-600 w-full py-2 rounded-md"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button
          className="w-full bg-green-600 py-2 rounded-md"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>

        {showPayPal && (
        <div className="paypal-container">
          <PayPalScriptProvider options={{ "client-id": "AafP6rfk8Zra_2aXEs1RdOCcE4Gjxf0oO-j9oCDO8VkIpzcERj1MR43zmczrEQHtM06ERlVdr8y9wdfl" }}>
  <PayPalButtons
    createOrder={(data, actions) => {
      console.log('Creating order with total price:', totalPrice.toFixed(2)); // Debugging line
      return actions.order.create({
        purchase_units: [{
          amount: {
           value:totalPrice
          },
        }],
      });
    }}
    onApprove={async (data, actions) => {
      await actions.order.capture();
      // Handle successful payment here

      alert('Payment successful!');
      await handlePaymentSuccess(data.orderID);
      setShowPayPal(false);
    }}
    onError={(err) => {
      console.error('PayPal error:', err);
      alert('Payment failed!');
      setShowPayPal(false);
    }}
  />
</PayPalScriptProvider>

        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default HeroProduct;
