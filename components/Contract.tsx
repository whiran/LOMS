'use client'
import React, { useState } from 'react'
import Userinputforcon from './Userinputforcon';
import Contractdata from './Contractdata';
import { useMyContext } from '@/context/MyContext';
import { findContractNumbersRelatedToStroke } from '../app/actions/api/testone'


const Contract = ()  => {
  const {state5} = useMyContext();
  const stroke = state5;
  
  findContractNumbersRelatedToStroke()
 
  return (
    <div className='overflow-auto w-full relative'>
      <table className="border-collapse relative border border-slate-500 text-xs bg-white font-mono w-full border-spacing-0 2xl:text-lg xl:text-base">
        <thead className='sticky top-[-1px] bg-white'>
        <tr >
          <th className=' border z-10 bg-white border-black  w-40 '></th>
          <th className=' border z-10 bg-white border-black  w-40 '>StrokeNO</th>
          <th className=' border z-10 bg-white border-black  w-40 '>Contract No</th>
          <th className=' border z-10 bg-white border-black  w-40 '>SEASON</th>
          <th className=' border z-10 bg-white border-black  w-40 '>TDEPT</th>
          <th className=' border z-10 bg-white border-black  w-40 '>PRODESC</th>
          <th className=' border z-10 bg-white border-black  w-40 '>STROKE_DESC</th>
        </tr>
        </thead>
        <tbody>
          <Contractdata strokeno = {stroke}/>
          <Userinputforcon strokeno={stroke} />

     
        </tbody>
      </table>
    </div>
  )
}

export default Contract