import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import config from './config';
import '../styles/Lineorder.css';

const Lineorder = () => {
  const [userData, setUserData] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [tableNo, setTableNo] = useState('T1');
  const [orderTime, setOrderTime] = useState(new Date().toLocaleTimeString());
  const [foods, setFoods] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
  console.log(token);
        const response = await fetch(`${config.baseURL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch profile', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    const orderDetails = {
      customerName,
      tableNo,
      orderTime,
      foods,
    };

    try {
      const response = await fetch(`${config.baseURL}/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        alert('Order submitted successfully');
        window.location.reload(); 
      } else {
        console.error('Failed to submit order', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };
  
  return (
    <div className="container">
      <div className="nav-container">
        <h3>Orders Detail</h3>
        <Link to="/myorders">My Orders</Link>
        <Link to="/orders">Orders</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button> 
      </div>
      <div className="profile-container">
        <h2>Profile</h2>
        {userData ? (
          <div>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Age: {userData.age}</p>
            <p>Gender: {userData.gender}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <h2>Line Order</h2>
        <div>
          <label>
            Customer Name:
            <input 
              type="text" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
            />
          </label>
        </div>
        <div>
          <label>
            Table No:
            <select 
              value={tableNo} 
              onChange={(e) => setTableNo(e.target.value)}
            >
              <option value="T1">T1</option>
              <option value="T2">T2</option>
              <option value="T3">T3</option>
              <option value="T4">T4</option>
              <option value="T5">T5</option>
              <option value="T6">T6</option>
              <option value="T7">T7</option>
              <option value="T8">T8</option>
              <option value="T9">T9</option>
              <option value="T10">T10</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Time:
            <input 
              type="text" 
              value={orderTime} 
              readOnly 
            />
          </label>
        </div>
        <div>
          <label>
            Foods:
            <input 
              type="text" 
              value={foods} 
              onChange={(e) => setFoods(e.target.value)} 
            />
          </label>
        </div>
        <button onClick={handleSubmit}>Submit Order</button>
      </div>
    </div>
  );
};

export default Lineorder;
