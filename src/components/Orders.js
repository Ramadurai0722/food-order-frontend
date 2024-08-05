import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from './config';
import '../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch(`${config.baseURL}/order/getall`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch(`${config.baseURL}/order/delete/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setOrders(orders.filter(order => order._id !== orderId));
      } else {
        console.error('Failed to delete order', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="layout">
      <div className="nav-container">
        <h3>Navigation</h3>
        <Link to="/profile">Home</Link>
        <Link to="/myorders">My Orders</Link>
        <Link to="/orders">Orders</Link>
      </div>
      <div className="orders-content">
        <h2>Orders</h2>
        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="order-item">
                <p><strong>Customer Name:</strong> {order.customerName}</p>
                <p><strong>Table No:</strong> {order.tableNo}</p>
                <p><strong>Order Time:</strong> {order.orderTime}</p> 
                <p><strong>Foods:</strong> {order.foods}</p>
                <p><strong>Order Taker mail id:</strong> {order.userEmail}</p>
                <button className="delete-button" onClick={() => handleDeleteOrder(order._id)}>Delivered</button>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
