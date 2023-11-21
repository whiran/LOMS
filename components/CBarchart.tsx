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

interface CountryData {
  countryCode: string;
  count: number;
}

interface Props {
  data: CountryData[];
}

function CBarchart({ data }: Props) {

  const countryCodes = data.map(item => item.countryCode);
  const counts = data.map(item => item.count);

  const chartData = {
    labels: countryCodes,
    datasets: [
      {
        label: 'Count',
        data: counts,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgb(53, 162, 235, 0.4)',
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
        text: 'Country Counts',
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className=' lg:h-[50vh] h-[40vh]  p-4 border rounded-lg w-full bg-[#ffffff] overflow-auto'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default CBarchart;