'use client'
import React from 'react'
import { Line } from 'react-chartjs-2';
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
import Contractdata from './Contractdata';
import Caredata from './Caredata';
import Otherdata from './Otherdata';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type MonthlyData = { month: number; count: number }[]; 

interface Props {
  contractdata: MonthlyData[]
  caredata: MonthlyData[]
  otherdata: MonthlyData[]
  quntitydata: MonthlyData[]
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

  const getCountForMonth = (data: MonthlyData[], month: number): number => {
    const monthData = data.find(item => item.month === month);
    return monthData ? monthData.count : 0;
  };
  
  const contractCounts = labels.map((_, index) => getCountForMonth(contractdata, index + 1));

  const data = {
    labels,
    datasets: [
      {
        label: 'Contracts',
        data: contractdata.map((contract) => contract.count ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Care',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  return (
    <div>Allbarchart</div>
  )
}

export default Allbarchart