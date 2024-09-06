import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/TransactionsForms.css';

const EditTransaction = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('expense');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/transactions/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { name, amount, description, date, type } = response.data;
        setName(name);
        setAmount(amount);
        setDescription(description);
        setDate(date);
        setType(type);
      } catch (err) {
        setError('Erreur lors du chargement de la transaction.');
      }
    };

    fetchTransaction();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/transactions/${id}`, {
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
      setError('Erreur lors de la mise à jour de la transaction.');
    }
  };

  return (
    <div className="container">
      <h1 className='text-xl'>Modifier la transaction</h1>
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
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditTransaction;
