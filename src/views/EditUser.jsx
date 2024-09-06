import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { name, email, admin } = response.data;
        setName(name);
        setEmail(email);
        setAdmin(admin);
      } catch (err) {
        setError('Erreur lors du chargement de l\'utilisateur.');
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/users/${id}`, {
        name,
        email,
        admin
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/all-users');
    } catch (err) {
      setError('Erreur lors de la mise à jour de l\'utilisateur.');
    }
  };

  return (
    <div className="container">
      <h1 className='text-xl'>Modifier l'utilisateur</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-group">
          <label>Rôle</label>
          <div>
            <input
              type="radio"
              id="user"
              name="admin"
              value={false}
              checked={!admin}
              onChange={(e) => setAdmin(e.target.value === 'true')}
            />
            <label htmlFor="user">Utilisateur</label>
          </div>
          <div>
            <input
              type="radio"
              id="admin"
              name="admin"
              value={true}
              checked={admin}
              onChange={(e) => setAdmin(e.target.value === 'true')}
            />
            <label htmlFor="admin">Administrateur</label>
          </div>
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditUser;
