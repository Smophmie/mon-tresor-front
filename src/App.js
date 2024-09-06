import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Homepage from './views/Homepage';
import Login from './views/Login';
import Register from './views/Register';
import Transactions from './views/Transactions';
import Footer from './components/Footer';
import AddTransaction from './views/AddTransaction';
import EditTransaction from './views/EditTransaction';
import Account from './views/Account';
import AdminPage from './views/AdminPage';
import EditUser from './views/EditUser';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Homepage isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/edit-transaction/:id" element={<EditTransaction />} />
        <Route path="/account" element={<Account />} />
        <Route path="/all-users" element={<AdminPage />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
      <Footer isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
    </Router>
  );
};

export default App;
