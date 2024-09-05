import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../style/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/login', {
      email,
      password,
    })
    .then(response => {
      console.log(response);

      login();

      const { token } = response.data;

      localStorage.setItem('token', token);

      console.log('Login successful:', response.data);


      navigate('/');
    })
    .catch(error => {
      setError(error.response?.data?.message || 'An error occurred while logging in.');
      console.error('Error logging in:', error.response?.data || error.message);
    });
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

            <button type="submit">Connexion</button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
