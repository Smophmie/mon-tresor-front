import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';

const HomepageConnectedUser = () => {
  const [earningsData, setEarningsData] = useState({ labels: [], datasets: [] });
  const [expensesData, setExpensesData] = useState({ labels: [], datasets: [] });
  const [expensesDistributionData, setExpensesDistributionData] = useState({ labels: [], datasets: [] });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [earningsResponse, expensesResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/earnings', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:8000/api/expenses', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setEarningsData({
          labels: earningsResponse.data.map(e => format(new Date(e.date), 'yyyy-MM')),
          datasets: [{
            label: 'Gains',
            data: earningsResponse.data.map(e => e.amount),
            backgroundColor: '#2271ce',
          }],
        });

        setExpensesData({
          labels: expensesResponse.data.map(e => format(new Date(e.date), 'yyyy-MM')),
          datasets: [{
            label: 'Dépenses',
            data: expensesResponse.data.map(e => e.amount),
            backgroundColor: '#600684',
          }],
        });

        const expenseCategories = expensesResponse.data.reduce((acc, expense) => {
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
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>LChargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className='flex'>
      <BarChart earningsData={earningsData} expensesData={expensesData} />
      <DoughnutChart data={expensesDistributionData} />
    </div>
  );
};

export default HomepageConnectedUser;
