import Link from 'next/link';
import React from 'react'

type order = {
  id: string;
  coo: string;
  fiber: string;
  component: string;
  caretext: string;
  washsimbol: string;
  sizeration: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  ordervalue?: number | null;
}


type Props = {
  orders: order[];

}

const Orderlits = (props: Props) => {
  return (
    <div className=' h-full bg-slate-300 w-full'>
      <div className=' border-2 rounded-md mx-8 mt-4 bg-white flex flex-col'>
        <div className='text-lg bg-cyan-500 flex'><p className='ml-2 font-medium'>Order Details</p></div>
        <table className='overflow-y-auto'>
          <thead className='font-normal'>
            <tr>
              <th className='w-24 text-left'>Id</th>
              <th className='w-24 text-left'>state</th>
              <th className='w-24 text-left'>Order value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.orders.map(order => (
            <tr key={order.id} className='border-t-1'>
              <td className='w-24'>{order.id}</td>
              <td className='w-24'>{order.state}</td>
              <td className='w-24'>
                {order?.ordervalue}
                </td>
              <td className='w-4  bg-teal-400 rounded-sm m-2'><Link href={`/protected/pdfcontent/${order.id}`}><button className='w-full text-center'>Pdf</button></Link></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orderlits