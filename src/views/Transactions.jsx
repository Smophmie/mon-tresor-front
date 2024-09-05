import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, UseNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../style/Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
    }
  }, [isAuthenticated]);

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

  if (!isAuthenticated) {
    return <div>Vous devez être connecté pour voir vos transactions.</div>;
  }

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
    navigate(`http://localhost:8000/transactions/edit/${id}`);
  };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/transactions/${id}`, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
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
                    onClick={() => handleEdit(transaction.id)}
                    className="hover:underline"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="hover:underline"
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