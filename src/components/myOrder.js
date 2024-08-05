import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from './config';
import '../styles/Orders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch(`${config.baseURL}/order/my-orders`, {
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
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        setOrders(orders.filter(order => order._id !== orderId));
        alert('Order successfully deleted'); 
      } else {
        console.error('Failed to delete order', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch(`${config.baseURL}/order/my-orders`, {
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
  };

  const handleUpdateOrder = async (orderId, updatedFields) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const { userEmail, orderTime, ...fieldsToUpdate } = updatedFields;

      const response = await fetch(`${config.baseURL}/order/update/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fieldsToUpdate),
      });

      if (response.ok) {
        await response.json(); 
        fetchOrders(); 
        alert('Order successfully updated'); 
      } else {
        console.error('Failed to update order', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateClick = (order) => {
    const newCustomerName = prompt('Enter new customer name:', order.customerName);
    const newTableNo = prompt('Enter new table number:', order.tableNo);
    const newFoods = prompt('Enter new foods:', order.foods);

    if (newCustomerName && newTableNo && newFoods) {
      const newDetails = {
        customerName: newCustomerName,
        tableNo: newTableNo,
        foods: newFoods,
      };

      handleUpdateOrder(order._id, newDetails);
    } else {
      console.error('Invalid input. Please fill out all fields.');
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
        <h2>My Orders</h2>
        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="order-item">
                <p><strong>Customer Name:</strong> {order.customerName}</p>
                <p><strong>Table No:</strong> {order.tableNo}</p>
                <p><strong>Order Time:</strong> {order.orderTime}</p>
                <p><strong>Foods:</strong> {order.foods}</p>
                <p><strong>Order Taker mail id:</strong> {order.userEmail}</p>
                <button className="update-button" onClick={() => handleUpdateClick(order)}>Update</button>
                <button className="delete-button" onClick={() => handleDeleteOrder(order._id)}>Delete</button>
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

export default MyOrders;
