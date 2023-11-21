import React from 'react'
import Userinputforquntity from './Userinputforquntity'
import Quntitydata from './Quntitydata'

type Props = {}

const Quantity = (props: Props) => {
  return (
    <div className='overflow-auto w-full'>
    <table className="border-collapse border border-slate-500 text-xs bg-white font-mono">
      <thead className='sticky  border top-[-1px] bg-white z-10'>
        <tr>
          <th className='border border-black  w-40'></th>
          <th className='border border-black  w-40'>Color Code</th>
          <th className='border border-black  w-40'>Color Name</th>
          <th className='border border-black  w-40'>UPC No</th>
          <th className='border border-black  w-40'>Primary Size</th>
          <th className='border border-black  w-40'>Secondary Size</th>
          <th className='border border-black  w-40'>Selling Price</th>
          <th className='border border-black  w-40'>ORDER QTY</th>
        </tr>
      </thead>
      <tbody>
        <Quntitydata />
        <Userinputforquntity />
      </tbody>
    </table>
    </div>
  )
}

export default Quantity