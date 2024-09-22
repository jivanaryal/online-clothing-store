import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

const CompletedOrders = () => {
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

  // Filter completed orders
  const completedOrders = orders.filter(order => order.order_status === 'complete');

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <p className="ml-4 text-xl">Loading Orders...</p>
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Completed Orders</h1>
      {completedOrders.length === 0 ? (
        <p className="text-lg text-gray-600">No completed orders available.</p>
      ) : (
        <div className="space-y-6">
          {completedOrders.map((order) => (
            <div
              key={order.order_id}
              className="border rounded-lg p-6 shadow-lg bg-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <h2 className="text-xl font-semibold mb-2">Order ID: {order.order_id}</h2>
              <p className="mb-1">
                <strong>Customer:</strong> {order.FirstName} {order.LastName}
              </p>
              <p className="mb-1">
                <strong>Phone:</strong> {order.PhoneNumber}
              </p>
              <p className="mb-1">
                <strong>Total Amount:</strong> ${order.total_amount}
              </p>
              <p className="mb-1">
                <strong>Product:</strong> {order.product_name}
              </p>
              <p className="mb-1">
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p className="mb-1">
                <strong>Unit Price:</strong> ${order.unit_price}
              </p>
              <p className="mb-1">
                <strong>Product Price:</strong> ${order.product_price}
              </p>
              <p className="mb-1">
                <strong>Status:</strong> {order.order_status}
              </p>
              <button
                className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed mt-4"
                disabled
              >
                Completed
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedOrders;
