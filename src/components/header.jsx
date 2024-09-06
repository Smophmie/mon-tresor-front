import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Header.css';

const Header = ({ isAuthenticated, onLogout }) => {
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
    <header>
      <div className="navbar navbar-header">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><Link to="/" className="">Accueil</Link></li>
              {isAuthenticated && <li><Link to="/transactions" className="">Mes transactions</Link></li>}
              {isAuthenticated && <li><Link to="/account" className="">Mon compte</Link></li>}
              {isAuthenticated && (
                <li>
                  <button onClick={handleLogout} className="">
                    Me déconnecter
                  </button>
                </li>
              )}
              {!isAuthenticated && <li><Link to="/login" className="">Me connecter</Link></li>}
              {!isAuthenticated && <li><Link to="/register" className="">Créer un compte</Link></li>}
            </ul>
          </div>
          <Link to="/" className="btn-ghost">
            <img
              src="/images/MonTrésor-removebg-preview.png"
              alt="Logo"
              className="h-14 lg:h-19"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/" className="">Accueil</Link></li>
            {isAuthenticated && <li><Link to="/transactions" className="">Mes transactions</Link></li>}
            {isAuthenticated && <li><Link to="/account" className="">Mon compte</Link></li>}
          </ul>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            {isAuthenticated && (
              <li>
                <button onClick={handleLogout} className="">
                  Me déconnecter
                </button>
              </li>
            )}
            {!isAuthenticated && <li><Link to="/login" className="">Me connecter</Link></li>}
            {!isAuthenticated && <li><Link to="/register" className="">Créer un compte</Link></li>}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
