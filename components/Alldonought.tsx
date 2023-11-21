"use client"
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

type Props = {
  contract: number,
  care: number,
  other: number,
  quntity: number
};

function Adoughnut({contract,care,other,quntity}: Props){

  const data = {
    labels: ['Contracts','Care','Other','Quntity'],
    datasets:[{
      label:'Count',
      data:[contract,care,other,quntity],
      backgroundColor: [
        'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
    'rgb(55, 52, 235)'],
      borderColor: ['rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
    'rgb(55, 52, 235)'],
      hoverOffset: 4
    }]
  }

  const options = {
    responsive: true,
  }

  return (
    <div className='h-96 w-full m-2 border rounded-lg  bg-white '>
      <Doughnut
      data ={data} 
      options={options}
      ></Doughnut>
    </div>
  );

}

export default Adoughnut;