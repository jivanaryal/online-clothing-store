import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


  const filterData = orders.filter((element)=>element.order_status === "pending");
    console.log(filterData);


    const HandleClick =async (id)=>{
       const order_status = "complete";
        
         await axios.patch(`http://localhost:5001/api/ocs/orders/update/${id}`,{order_status});
    }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Order List</h1>
      <div className="space-y-4">
        {filterData.map((order) => (
          <div key={order.order_id} className="border rounded-lg p-4 shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-2">Order ID: {order.order_id}</h2>
            <p className="mb-1"><strong>Customer:</strong> {order.FirstName} {order.LastName}</p>
            <p className="mb-1"><strong>Phone:</strong> {order.PhoneNumber}</p>
            <p className="mb-1"><strong>Total Amount:</strong> ${order.total_amount}</p>
            <p className="mb-1"><strong>Product:</strong> {order.product_name}</p>
            <p className="mb-1"><strong>Quantity:</strong> {order.quantity}</p>
            <p className="mb-1"><strong>Unit Price:</strong> ${order.unit_price}</p>
            <p className="mb-1"><strong>Product Price:</strong> ${order.product_price}</p>
            <button className="mb-1"><strong>Status:</strong> {order.order_status}</button>
            <button className='bg-blue-500 p-2 font-semibold text-white rounded ml-4' onClick={()=>HandleClick(order.order_id)}>Mark As complete</button>
             
               
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;