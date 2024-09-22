import { useParams, useNavigate } from "react-router-dom";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import Rating from "@/components/rating/Rating";

const HeroProduct = () => {
  const [product, setProduct] = useState<any>(null);
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

      const isProductInCart = cartItems.some(
        (item: any) => item.product_id === product.product_id
      );

      if (isProductInCart) {
        alert("Product is already in the cart.");
      } else {
        await axios.post("http://localhost:5001/api/ocs/carts/items", {
          cart_id: cartId,
          product_id: product.product_id,
          quantity: count,
        });

        navigate("/cart");
      }
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
    <main>
      <div className="border md:grid grid-cols-2 gap-2">
        <div className="image h-[70vh]">
          <img
            src={`http://localhost:5001${product?.imageURL[0]}`}
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
                max={product?.stockQuantity || 1}
              />
              <FaPlus
                className="text-gray-400 cursor-pointer"
                onClick={() => setCount(Math.min(product?.stockQuantity || 1, count + 1))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 place-items-center justify-between text-white gap-3">
            <button
              className={`w-full py-2 rounded-md ${product?.stockQuantity === 0 ? 'bg-gray-400' : 'bg-blue-600'}`}
              onClick={handleAddToCart}
              disabled={product?.stockQuantity === 0}
            >
              Add to Cart
            </button>
            <button
              className={`w-full py-2 rounded-md ${product?.stockQuantity === 0 ? 'bg-gray-400' : 'bg-green-600'}`}
              onClick={handleBuyNow}
              disabled={product?.stockQuantity === 0}
            >
              Buy Now
            </button>
            {showPayPal && (
              <div className="paypal-container">
                <PayPalScriptProvider options={{ "client-id": "AafP6rfk8Zra_2aXEs1RdOCcE4Gjxf0oO-j9oCDO8VkIpzcERj1MR43zmczrEQHtM06ERlVdr8y9wdfl" }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [{
                          amount: {
                            value: totalPrice.toFixed(2),
                          },
                        }],
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
      </div>
      <div className="description">
        <h2 className="font-bold text-3xl my-3">Product Details</h2>
        <div>{product?.description}</div>
      </div>
    </main>
  );
};

export default HeroProduct;
