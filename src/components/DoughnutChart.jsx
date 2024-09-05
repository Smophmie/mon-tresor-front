import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const DoughnutChart = ({ data }) => {
  const doughnutData = {
    labels: data.labels || [],
    datasets: [{
      data: data.datasets?.[0]?.data || [],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#e7e9ed', '#4bc0c0'],
    }],
  };

  return (
    <div style={{ width: '30%', height: '300px', margin: '0 auto' }}>
      <h1>Répartition des dépenses</h1>
      <Doughnut
        data={doughnutData}
        options={{ responsive: true }}
      />
    </div>
  );
};

export default DoughnutChart;
