import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/login';
import RegisterForm from './components/register';
import Lineorder from './components/Lineorder';
import Orders from './components/Orders';
import Myorders from './components/myOrder';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Lineorder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/myorders" element={<Myorders />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
