import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import ParticlesComponent from './particles';
import config from './config';
import '../styles/login.css'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${config.baseURL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful', data);
        localStorage.setItem('token', data.token);
        alert('Login successful')
        navigate('/profile'); 
      } else {
        const errorMessage = await response.text(); 
        console.error('Login failed:', errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="login-form-container">
      <ParticlesComponent id="particles" />
      <form onSubmit={handleSubmit} className="login-form">
        <br />
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="input-field"
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      </form>
     
    </div>
  );
};

export default LoginForm;
