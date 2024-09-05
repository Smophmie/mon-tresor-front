import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ earningsData, expensesData }) => {
  // Combine earnings and expenses data
  const combinedData = {
    labels: earningsData.labels || [],
    datasets: [
      {
        label: 'Gains',
        data: earningsData.datasets?.[0]?.data || [],
        backgroundColor: '#2271ce',
        stack: 'stack1',
      },
      {
        label: 'Dépenses',
        data: expensesData.datasets?.[0]?.data || [],
        backgroundColor: '#600684',
        stack: 'stack1',
      }
    ],
  };

  // Log data to debug
  console.log('Earnings Data:', earningsData);
  console.log('Expenses Data:', expensesData);
  console.log('Combined Data:', combinedData);

  return (
    <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
      <h1>Mon historique des transactions</h1>
      <Bar
        data={combinedData}
        options={{ 
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw} €`;
                }
              }
            }
          },
          scales: {
            x: { 
              stacked: true,
              type: 'category',
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: { 
              stacked: true,
              title: {
                display: true,
                text: 'Montant (€)'
              },
              beginAtZero: true
            }
          },
        }}
      />
    </div>
  );
};

export default BarChart;
