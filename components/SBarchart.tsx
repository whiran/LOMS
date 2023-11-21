"use client"
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

interface SData {
  supplierseries: string;
  count: number;
}

interface Props {
  data: SData[];
}

function SBarchart({ data }: Props) {

  const supplierseries = data.map(item => item.supplierseries);
  const counts = data.map(item => item.count);

  const chartData = {
    labels: supplierseries,
    datasets: [
      {
        label: 'Count',
        data: counts,
        borderColor: 'rgb(235, 53, 186)',
        backgroundColor: 'rgb(235, 53, 186, 0.4)',
      },
    ],
  };

  const chartOptions ={
    plugins: {
      legend: {
        position: 'top'as const,
      },
      title: {
        display: true,
        text: 'supplierseries Counts',
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className=' lg:h-[50vh] h-[40vh]  p-4 border rounded-lg w-full bg-[#ffffff] overflow-auto mb-2'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default SBarchart;