import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetchTransactions();
    } else {
      // Rediriger si l'utilisateur n'est pas connecté
      navigate('/login');
    }
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };
      const response = await axios.get('http://localhost:8000/api/transactions', config);
      setTransactions(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement des transactions...</div>;
  }

  if (error) {
    return <div>Erreur lors du chargement des transactions : {error.message}</div>;
  }

  const formatTransactionType = (type) => {
    return type === 'expense' ? 'Dépense' : 'Revenu';
  };

  const handleEdit = (id) => {
    navigate(`/transactions/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (error) {
      setError('Erreur lors de la suppression de la transaction.');
    }
  }

  return (
    <div className="container-transaction">
      <h1>Mes transactions</h1>
      <button className="">
        <Link to='/add-transaction'>Ajouter une transaction</Link>
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-center">Nom</th>
              <th className="px-4 py-2 border-b text-center">Type</th>
              <th className="px-4 py-2 border-b text-center">Description</th>
              <th className="px-4 py-2 border-b text-center">Montant</th>
              <th className="px-4 py-2 border-b text-center">Date</th>
              <th className="px-4 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-center">{transaction.name}</td>
                <td className="px-4 py-2 border-b text-center">
                  {formatTransactionType(transaction.type)}
                </td>
                <td className="px-4 py-2 border-b text-center">{transaction.description}</td>
                <td className={`px-4 py-2 border-b text-center ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                  {transaction.amount} €
                </td>
                <td className="px-4 py-2 border-b text-center">{transaction.date}</td>
                <td className="px-4 py-2 border-b text-center">
                  <button
                    className="hover:underline"
                  >
                    <Link to={`/edit-transaction/${transaction.id}`}>Modifier</Link>
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="hover:underline ml-4"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
