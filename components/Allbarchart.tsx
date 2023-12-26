'use client'
import React from 'react'
import {  Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type MonthlyData = { month: number; count: number }[]; 

interface Props {
  contractdata: MonthlyData
  caredata: MonthlyData
  otherdata: MonthlyData
  quntitydata: MonthlyData
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


const Allbarchart = (props: Props) => {

  const { contractdata, caredata, otherdata, quntitydata } = props;
  
 
  const data = {
    labels,
    datasets: [
      {
        label: 'Contracts',
        data: contractdata.map((con) => con.count),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Care',
        data: caredata.map(item => item.count),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Other',
        data: otherdata.map(item => item.count),
        borderColor: 'rgb(217, 235, 53)',
        backgroundColor: 'rgba(217, 235, 53,0.5)'
      },
      {
        label: 'Quantity',
        data: quntitydata.map(item => item.count),
        bordercolor: 'rgb(75, 27, 247)',
        backgroundColor: 'rgba(75, 27, 247,0.5)'
      }
    ],
  };
  
  return (
    <Line data={data} options={options} />
  )
}

export default Allbarchart