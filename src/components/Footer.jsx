import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Header.css';

const Footer = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Déconnexion en cours...');
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        await axios.post('http://localhost:8000/api/logout', {}, config);
        localStorage.removeItem('token');
        onLogout(); // Notify parent component of logout
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  return (
    <footer>
      <div className="navbar navbar-footer">
        <div className="navbar-start">
          <Link to="/" className="btn-ghost">
            <img
              src="/images/MonTrésor-removebg-preview.png"
              alt="Logo"
              className="h-14 lg:h-19"
            />
          </Link>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className="">Accueil</Link></li>
            {isAuthenticated && <li><Link to="/transactions" className="">Mes transactions</Link></li>}
            {isAuthenticated && <li><Link to="/" className="">Mon compte</Link></li>}
            <li><Link to="/" className="">Mentions légales</Link></li>
            <li><Link to="/" className="">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
