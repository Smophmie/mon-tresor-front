import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const HomepageForConnectedUser = () => {
  const [earningsData, setEarningsData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const earningsResponse = await axios.get('http://localhost:8000/api/earnings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const expensesResponse = await axios.get('http://localhost:8000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEarningsData(earningsResponse.data);
        setExpensesData(expensesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  // Process data for the chart
  const processData = (data) => {
    const result = {};
    data.forEach((item) => {
      const month = new Date(item.date).toLocaleString('default', { month: 'long' });
      if (!result[month]) {
        result[month] = 0;
      }
      result[month] += item.amount;
    });
    return result;
  };

  const earningsByMonth = processData(earningsData);
  const expensesByMonth = processData(expensesData);

  const labels = Object.keys({ ...earningsByMonth, ...expensesByMonth });

  const data = {
    labels,
    datasets: [
      {
        label: 'Revenus',
        data: labels.map((month) => earningsByMonth[month] || 0),
        backgroundColor: '#600684',
      },
      {
        label: 'Dépenses',
        data: labels.map((month) => expensesByMonth[month] || 0),
        backgroundColor: '#2271ce',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="container mx-auto">
      <h1>Cette année</h1>
      <div className="relative" style={{ height: '400px', width: '600px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default HomepageForConnectedUser;
