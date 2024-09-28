import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/ocs/orders/all');
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filterData = orders.filter(order => order.order_status === 'pending');

  const handleMarkComplete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to mark this order as complete?');
    if (confirmed) {
      try {
        const order_status = 'complete';
        await axios.patch(`http://localhost:5001/api/ocs/orders/update/${id}`, { order_status });
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.order_id === id ? { ...order, order_status: 'complete' } : order
          )
        );
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <p className="ml-4 text-xl">Loading Orders...</p>
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Pending Orders</h1>
      {filterData.length === 0 ? (
        <p className="text-lg text-gray-600">No pending orders available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterData.map((order) => (
            <div
              key={order.order_id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-6"
            >
              <div className="flex items-center mb-4">
                {/* Order Image */}
                <img
                  src={`http://localhost:5001${order.imageURL}`}
                  alt={order.product_name}
                  className="w-16 h-16 object-cover rounded-full shadow-sm"
                />
                <div className="ml-4">
                  <h2 className="text-2xl font-semibold text-gray-700">Order #{order.order_id}</h2>
                  <p className="text-gray-500">Customer: {order.FirstName} {order.LastName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p>
                  <strong>Phone:</strong> {order.PhoneNumber}
                </p>
                <p>
                  <strong>Total Amount:</strong> ${order.total_amount}
                </p>
                <p>
                  <strong>Product:</strong> {order.product_name}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Unit Price:</strong> ${order.unit_price}
                </p>
                <p>
                  <strong>Product Price:</strong> ${order.product_price}
                </p>
                <p>
                  <strong>Status:</strong> <span className="text-yellow-500 font-semibold">{order.order_status}</span>
                </p>
              </div>

              {order.order_status === 'pending' && (
                <button
                  className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                  onClick={() => handleMarkComplete(order.order_id)}
                >
                  Mark as Complete
                </button>
              )}

              {order.order_status === 'complete' && (
                <button
                  className="w-full mt-6 bg-green-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                  disabled
                >
                  Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
