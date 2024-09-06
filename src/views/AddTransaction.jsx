import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/TransactionsForms.css'

const AddTransaction = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('expense'); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/transactions', {
        name,
        amount,
        description,
        date,
        type
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/transactions');
    } catch (err) {
      setError('Erreur lors de l\'ajout de la transaction.');
    }
  };

  return (
    <div className="container">
      <h1 className='text-xl'>Ajouter une transaction</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom de la transaction</label>
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
          <label htmlFor="amount">Montant</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-group">
        <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <div>
            <input
              type="radio"
              id="expense"
              name="type"
              value="expense"
              checked={type === 'expense'}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="expense">Dépense</label>
          </div>
          <div>
            <input
              type="radio"
              id="earning"
              name="type"
              value="earning"
              checked={type === 'earning'}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="earning">Gain</label>
          </div>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddTransaction;
