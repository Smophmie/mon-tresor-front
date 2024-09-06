// src/components/Account.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/connectedUser', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { name, email } = response.data;
        setName(name);
        setEmail(email);
      } catch (err) {
        setError('Erreur lors du chargement des données utilisateur.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container" style={{margin: "50px"}}>
      <h1 className='text-xl'>Mon compte</h1>
      {error && <div className="error">{error}</div>}
      <div className="form-group">
        <label htmlFor="name">Nom :</label>
        <p id="name">{name}</p>
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail :</label>
        <p id="email">{email}</p>
      </div>
    </div>
  );
};

export default Account;
