import { useParams, useNavigate } from "react-router-dom";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Rating from "@/components/rating/Rating";

const HeroProduct = () => {
  const [product, setProduct] = useState<any>(null);
  const [CartItem, setCartItem] = useState<any>(null);
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
        console.log(data);
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
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: `/products/${product.product_id}` } });
      return;
    }
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
    const value = Math.max(1, Math.min(product?.stockQuantity || 1, parseInt(e.target.value) || 1));
    setCount(value);
  };

const handleAddToCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login", { state: { from: "/cart" } });
    return;
  }

  try {
    const cartResponse = await axios.get(
      `http://localhost:5001/api/ocs/carts/customer/${localStorage.getItem("CustomerID")}`
    );

    const cartId = cartResponse.data[0].cart_id;
    if (!cartId) {
      alert("Failed to retrieve cart information.");
      return;
    }

    const cartItemsResponse = await axios.get(
      `http://localhost:5001/api/ocs/carts/items/${cartId}`
    );

    const cartItems = cartItemsResponse.data;

    // Check if the product is already in the cart
    const isProductInCart = cartItems.some(
      (item: any) => item.product_id === product.product_id
    );

    if (isProductInCart) {
      // Update quantity if product is already in cart
      const filterData = cartItems.filter((item) => item.product_id === product.product_id);
      const id = filterData[0].id;
      await axios.patch("http://localhost:5001/api/ocs/carts/items", {
        cart_id: id,
        quantity: count,
      });
    } else {
      // Add product to cart if not present
      await axios.post("http://localhost:5001/api/ocs/carts/items", {
        cart_id: cartId,
        product_id: product.product_id,
        quantity: count,
      });
    }

    navigate("/cart");
  } catch (error) {
    alert("Failed to add item to cart.");
  }
};


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const originalPrice = product?.price || 0;
  const discountedPrice = product
    ? product.price - (product.price * product.discount_percentage) / 100
    : 0;

  let totalPrice: number = discountedPrice * count;

  const handlePaymentSuccess = async (orderId: string) => {
    try {
      await axios.post('http://localhost:5001/api/ocs/orders', {
        customerId: localStorage.getItem("CustomerID"),
        productId: product.product_id,
        quantity: count,
        totalPrice: totalPrice
      });
      alert('Order placed successfully!');
    } catch (error) {
      alert('Failed to place order.');
    }
  };

  return (
<main className="bg-gray-100 min-h-screen py-12 px-4">
  <div className="container mx-auto">
    <div className="border md:grid grid-cols-2 gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Product Image Section */}
      <div className="relative h-[80vh]">
        <img
          src={`http://localhost:5001${product?.imageURL[0]}`}
          alt={product?.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
        />
        {product?.stockQuantity === 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-lg">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col gap-6 p-8">
        {/* Product Name and Category */}
        <div>
          <p className="text-gray-500 text-sm mb-2 uppercase">{product?.category}</p>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{product?.name}</h1>
        </div>

        {/* Rating and Review */}
        <div className="flex items-center gap-2 text-yellow-500">
          {renderStars(product?.avgRating || 0)}
          <span className="text-gray-600 text-sm">
            {product?.avgRating ? `${product?.avgRating} Stars` : "No rating yet"}
          </span>
        </div>

        {/* Price and Discount Section */}
        <div className="py-4 border-t border-b border-gray-200">
          <p className="text-3xl font-bold text-blue-600 mb-2">
            Rs. {totalPrice.toLocaleString("en-IN")}
          </p>
          {product?.discount_percentage > 0 && (
            <div className="flex gap-2 items-center text-lg">
              <p className="text-gray-400 line-through">Rs. {originalPrice}</p>
              <p className="text-red-500 font-medium">{product?.discount_percentage}% Off</p>
            </div>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 py-3">
          <p className="text-gray-600 font-medium">Quantity</p>
          <div className="flex items-center py-2  px-3 border border-gray-300 rounded-lg overflow-hidden">
            <FaMinus
              className=" text-gray-600 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => setCount(Math.max(1, count - 1))}
            />
            <input
              type="number"
              className="w-12 text-center border-l border-r border-gray-300 outline-none"
              value={count}
              onChange={handleQuantityChange}
              min={1}
              max={product?.stockQuantity || 1}
            />
            <FaPlus
              className="text-center text-gray-600 cursor-pointer hover:bg-gray-200 transition"
              onClick={() => setCount(Math.min(product?.stockQuantity || 1, count + 1))}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            className={`py-3 font-semibold rounded-lg transition text-white ${
              product?.stockQuantity === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleAddToCart}
            disabled={product?.stockQuantity === 0}
          >
            Add to Cart
          </button>
          <button
            className={`py-3 font-semibold rounded-lg transition text-white ${
              product?.stockQuantity === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={handleBuyNow}
            disabled={product?.stockQuantity === 0}
          >
            Buy Now
          </button>
        </div>

        {/* PayPal Button */}
        {showPayPal && (
          <div className="mt-4">
            <PayPalScriptProvider
              options={{ "client-id": "AafP6rfk8Zra_2aXEs1RdOCcE4Gjxf0oO-j9oCDO8VkIpzcERj1MR43zmczrEQHtM06ERlVdr8y9wdfl" }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  await actions.order.capture();
                  handlePaymentSuccess(data.orderID);
                }}
              />
            </PayPalScriptProvider>
          </div>
        )}
      </div>
    </div>

    {/* Product Description and Additional Info */}
    <div className="mt-8 bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Description</h2>
      <p className="text-gray-600 leading-relaxed">
        {product?.description || "No description available for this product."}
      </p>
    </div>

    {/* Ratings Section */}
    <div className="mt-8">
      <Rating />
    </div>
  </div>
</main>


  );
};

export default HeroProduct;
