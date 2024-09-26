import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import TopNav from '@/shared-components/navbar/TopNav';
import SecondNav from '@/shared-components/navbar/SecondNav';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const customerId = localStorage.getItem("CustomerID");
      try {
        const response = await axios.get(`http://localhost:5001/api/ocs/orders/single/${customerId}`);
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <p className="ml-4 text-xl">Loading Orders...</p>
      </div>
    );

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div>
      <TopNav />
      <SecondNav />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Order Details</h1>
        {orders.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">No pending orders available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="border border-gray-200 rounded-lg p-6 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2 text-blue-700">Order ID: {order.order_id}</h2>
                  <p className="text-sm text-gray-600">Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                </div>

                <div className="mb-4">
                  <p><strong>Customer:</strong> {order.FirstName} {order.LastName}</p>
                  <p><strong>Phone:</strong> {order.PhoneNumber}</p>
                  <p><strong>Status:</strong> <span className={`font-bold ${order.order_status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>{order.order_status}</span></p>
                </div>

                <div className="mb-4">
                  <p><strong>Product:</strong> {order.product_name}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Total Price:</strong> ${order.total_amount}</p>
                </div>

                <div className="flex justify-end">
                  {order.order_status === 'pending' ? (
                    <button
                      className="bg-yellow-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                      disabled
                    >
                      Pending
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                      disabled
                    >
                      Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;