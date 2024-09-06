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
  // Combine the labels (months) to make sure they are the same for both datasets
  const combinedLabels = [...new Set([...earningsData.labels, ...expensesData.labels])].sort();
  
  // Align the data with the combined labels
  const alignedEarningsData = combinedLabels.map(label => {
    const dataIndex = earningsData.labels.indexOf(label);
    return dataIndex !== -1 ? earningsData.datasets[0].data[dataIndex] : 0;
  });

  const alignedExpensesData = combinedLabels.map(label => {
    const dataIndex = expensesData.labels.indexOf(label);
    return dataIndex !== -1 ? expensesData.datasets[0].data[dataIndex] : 0;
  });

  const combinedData = {
    labels: combinedLabels,
    datasets: [
      {
        label: 'Gains',
        data: alignedEarningsData,
        backgroundColor: '#2271ce',
      },
      {
        label: 'Dépenses',
        data: alignedExpensesData,
        backgroundColor: '#600684',
      }
    ],
  };

  return (
    <div 
    className='w-2/3 bg-white p-6 mr-4 rounded-lg shadow-md'>
      <h1>Mon historique</h1>
      <Bar
        data={combinedData}
        options={{ 
          responsive: true,
          scales: {
            x: { 
              stacked: false, 
              title: {
                display: true,
                text: 'Mois'
              }
            },
            y: { 
              stacked: false, 
              title: {
                display: true,
                text: 'Montant'
              }
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
