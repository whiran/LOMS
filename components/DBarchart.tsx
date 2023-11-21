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

interface DData {
  departmentnumber: string;
  count: number;
}

interface Props {
  data: DData[];
}

function CBarchart({ data }: Props) {

  const departmentnumbers = data.map(item => item.departmentnumber);
  const counts = data.map(item => item.count);

  const chartData = {
    labels: departmentnumbers,
    datasets: [
      {
        label: 'Count',
        data: counts,
        borderColor: 'rgb(67, 224, 135)',
        backgroundColor: 'rgb(67, 224, 135, 0.4)',
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
        text: 'Department Counts',
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className=' lg:h-[50vh] h-[40vh]  p-4 border rounded-lg w-2/5 bg-[#ffffff] overflow-auto'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default CBarchart;