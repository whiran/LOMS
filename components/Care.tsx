import React from 'react'
import Userinputforcare from './Userinputforcare'
import Caredata from './Caredata'

type Props = {}

const Care = (props: Props) => {
  return (
    <div className='overflow-auto w-full'>
    <table className="border-collapse border border-slate-500 text-xs bg-white relative font-mono 2xl:text-lg xl:text-base">
      <thead className='sticky top-[-1px]'>
        <tr>
          <th className=' border z-10 bg-white border-black  w-40'>Ref No</th>
          <th className=' border z-10 bg-white border-black  w-40'>Wash Symbol</th>
          <th className=' border z-10 bg-white border-black  w-40'>Fibre</th>
          <th className=' border z-10 bg-white border-black  w-40'>Zoodes</th>
          <th className=' border z-10 bg-white border-black  w-40'>COO</th>
          <th className=' border z-10 bg-white border-black  w-40'>Caretext</th>
          <th className=' border z-10 bg-white border-black  w-20'>MPART/FW</th>
        </tr>
      </thead>
      <tbody>
        <Caredata />
        <Userinputforcare />
      </tbody>
    </table>
    </div>
  )
}

export default Care