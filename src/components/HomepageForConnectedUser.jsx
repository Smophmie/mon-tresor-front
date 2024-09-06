import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import BankCard from './BankCard';
import RecentTransactions from './RecentTransactions';
import { Link } from 'react-router-dom';

const HomepageConnectedUser = () => {
  const [earningsData, setEarningsData] = useState({ labels: [], datasets: [] });
  const [expensesData, setExpensesData] = useState({ labels: [], datasets: [] });
  const [expensesDistributionData, setExpensesDistributionData] = useState({ labels: [], datasets: [] });
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [userName, setUserName] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [earningsResponse, expensesResponse, userResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/earnings', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:8000/api/expenses', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:8000/api/connectedUser', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setUserName(userResponse.data.name);

        const earnings = earningsResponse.data;
        const expenses = expensesResponse.data;

        const balance = earnings.reduce((acc, curr) => acc + curr.amount, 0) - expenses.reduce((acc, curr) => acc + curr.amount, 0);
        setBalance(balance);

        setEarningsData({
          labels: earnings.map(e => format(new Date(e.date), 'yyyy-MM')),
          datasets: [{
            label: 'Gains',
            data: earnings.map(e => e.amount),
            backgroundColor: '#2271ce',
          }],
        });

        setExpensesData({
          labels: expenses.map(e => format(new Date(e.date), 'yyyy-MM')),
          datasets: [{
            label: 'Dépenses',
            data: expenses.map(e => e.amount),
            backgroundColor: '#600684',
          }],
        });

        const expenseCategories = expenses.reduce((acc, expense) => {
          acc[expense.name] = (acc[expense.name] || 0) + expense.amount;
          return acc;
        }, {});

        setExpensesDistributionData({
          labels: Object.keys(expenseCategories),
          datasets: [{
            data: Object.values(expenseCategories),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#e7e9ed', '#4bc0c0'],
          }],
        });

        const latestTransactions = [...earnings, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
        setLatestTransactions(latestTransactions);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className='flex flex-col'>
      <h1>Bienvenue, {userName}</h1>
      <div className='flex justify-end mb-4'>
        <button className='py-2 px-4 rounded-lg'>
          <Link to="/add-transaction">Ajouter une transaction</Link>
        </button>
      </div>
      <div className='flex justify-between mt-4'>
        <BankCard userName={userName} balance={balance} />
        <RecentTransactions latestTransactions={latestTransactions} />
      </div>
      <div className='flex justify-between mt-4'>
        <BarChart earningsData={earningsData} expensesData={expensesData} />
        <DoughnutChart data={expensesDistributionData} />
      </div>
    </div>
  );
};

export default HomepageConnectedUser;
