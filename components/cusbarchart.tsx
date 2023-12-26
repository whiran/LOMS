'use client'
import React from 'react'
import {  Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type MonthlyData = { month: number; count: number }[]; 

interface Props {
  monthdata: MonthlyData;
}

const labels = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'All counts',
    },
  },
};


const Cusbarchart = (props: Props) => {

  const {  monthdata } = props;
  
 
  const data = {
    labels,
    datasets: [
      {
        label: 'orders',
        data: monthdata.map((mon) => mon.count),
        borderColor: 'rgb(123, 211, 234)',
        backgroundColor: 'rgb(123, 211, 234)',
      },
     
    ],
  };
  
  return (
    <div className='w-[80%] h-[80%]'>
    <Bar data={data} options={options} />
    </div>
  )
}

export default Cusbarchart