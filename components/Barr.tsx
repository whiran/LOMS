import React from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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




const Barr = (props: Props) => {
  const { contractdata, caredata, otherdata, quntitydata } = props;

  const data = {
    labels,
    datasets: [
      {
        label: 'Contracts',
        data: contractdata.map((con) => con.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Care',
        data: caredata.map(item => item.count),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        labels: 'Other',
        data: otherdata.map(item => item.count),
        backgroundColor: 'rgba(217, 235, 53,0.5)'
      },
      {
        labels: 'Quantity',
        data: quntitydata.map(item => item.count),
        backgroundColor: 'rgba(75, 27, 247,0.5)'
      }
    ],
  };

  return (
    <Bar options={options} data={data} />
  )
}

export default Barr