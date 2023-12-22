import React from 'react'
import Link from 'next/link';
import Mainnavbar from './Mainnavbar';

type Props = {}

type inputs = {
  total: number;
  pending: number;
  processing: number;
  complete: number;
  hold: number;
  thismonth: number;
}

const Misforcustomer = ({total,pending,processing,complete,hold,thismonth}:inputs) => {
  return (
    <div className='h-screen w-full flex flex-col'>
    <div className='h-[8vh] '>
      <Mainnavbar />
    </div>
    <div className='grid grid-row-4 grid-cols-4 gap-1 mt-1 h-full '>
       <Link href=''>
      <div className='h-full w-full p-4  hover:p-2'>
        <div className='flex flex-col justify-center items-center h-full w-full border-2 border-slate-400 rounded-lg opacity-2 hover:bg-slate-400'>
          <p className='font-medium text-center'>Total Orders</p>
          <p className='font-bold text-2xl text-center'>{total}</p>
        </div>
      </div>
      </Link>
      <Link href=''>
      <div className='h-full w-full p-4  hover:p-2'>
        <div className='flex flex-col justify-center items-center h-full w-full border-2 border-slate-400 rounded-lg opacity-2 hover:bg-slate-400'>
          <p className='font-medium text-center'>Pending Orders</p>
          <p className='font-bold text-2xl text-center'>{pending}</p>
        </div>
      </div>
      </Link>
      <Link href=''>
      <div className='h-full w-full p-4  hover:p-2'>
        <div className='flex flex-col justify-center items-center h-full w-full border-2 border-slate-400 rounded-lg opacity-2 hover:bg-slate-400'>
          <p className='font-medium text-center'>Processing Orders</p>
          <p className='font-bold text-2xl text-center'>{processing}</p>
        </div>
      </div>
      </Link>
      <Link href=''>
      <div className='h-full w-full p-4  hover:p-2'>
        <div className='flex flex-col justify-center items-center h-full w-full border-2 border-slate-400 rounded-lg opacity-2 hover:bg-slate-400'>
          <p className='font-medium text-center'>Completed Orders</p>
          <p className='font-bold text-2xl text-center'>{complete}</p>
        </div>
      </div>
      </Link>
      <div className='row-span-3 col-span-3 p-4 hover:p-2'>
        <div className='flex flex-col justify-center items-center h-full w-full border-2 rounded-lg'>

        </div>
      </div>
      <Link href=''>
      <div className='h-full w-full p-4 hover:p-2'>
      <div className='flex flex-col justify-center items-center h-full w-full border-2 border-slate-400 rounded-lg opacity-2 hover:bg-slate-400'>
          <p className='font-medium text-center'>Hold Orders</p>
          <p className='font-bold text-2xl text-center'>{hold}</p>
        </div>
      </div>
      </Link>
      <div className='row-span-2 col-span-1 p-4 hover:p-2'>
        <div className='flex flex-col justify-start items-start h-full w-full border-2 p-2'>
          <p className='font-bold text-lg text-center'>Recent Orders</p>
          <p className='font-normal text-sm text-center'>You and your subusers have made <span className='font-bold'>{thismonth}</span> orders this month.</p>

        </div>
      </div>
      
    </div>
    </div>
  )
}

export default Misforcustomer