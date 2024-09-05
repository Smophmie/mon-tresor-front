import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Redirect to home page
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Une erreur est survenue lors de la connexion.');
      console.error('Erreur lors de la connexion:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleLogin}>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <h1 className='text-xl'>Connexion</h1>
          
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="E-mail" 
            required 
            className="input input-bordered w-full bg-inherit"
          />

          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Mot de passe" 
            required 
            className="input input-bordered w-full bg-inherit"
          />

          <button type="submit" className="btn-submit">Connexion</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
