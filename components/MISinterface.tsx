'use client'
import React, { useEffect, useState } from 'react'
import { Aperture, Activity, BookText, Tally4 } from 'lucide-react'

import { getquntity } from '@/app/actions/api/getquntity'
import Link from 'next/link'
import Adoughnut from './Alldonought'

import Caredata from './Caredata'
import Allbarchart from './Allbarchart'


type MonthlyData = { month: number; count: number }[]; 

type inputs = {
  processCount: number;
  pendingCount: number;
  completeCount: number;
  totalCount: number;
  contractCount: number;
  careCount: number;
  otherCount: number;
  quantityCount: number;
  contractmonths: MonthlyData;
  caremonths: MonthlyData;
  othermonths: MonthlyData;
  quntitymonths: MonthlyData;
}




const MISinterface = ({processCount, pendingCount, completeCount, totalCount, contractCount, careCount, otherCount, quantityCount, contractmonths, caremonths, othermonths, quntitymonths
}: inputs) => {

  



 

  return (
    <div className='flex flex-col mx-4 my-4 bg-slate-100'>
      <div className='flex flex-row w-full justify-between'>
     
        <div className='bg-white p-4 w-1/5 flex flex-row justify-between hover:bg-stone-50'>
            <div className='flex flex-col'>
              <div className='text-xs font-light text-gray-700'>Contract</div>
              <div className='text-2xl font-bold'>{contractCount}</div>
            </div>
            <div> <Link href='/protected/misreport/contract'><Aperture size={48} className='hover:text-[#24ed56]'/></Link></div>
          </div>
      
      
          <div className='bg-white p-4 w-1/5 flex flex-row justify-between hover:bg-stone-50'>
            <div className='flex flex-col'>
              <div className='text-xs font-light text-gray-700'>Care</div>
              <div className='text-2xl font-bold'>{careCount}</div>
            </div>
            <div><Link href='/protected/misreport/care'><Activity size={48} className='hover:text-[#24ed56]'/></Link></div>
          </div>
      
     
          <div className='bg-white p-4 w-1/5 flex flex-row justify-between hover:bg-stone-50'>
            <div className='flex flex-col'>
              <div className='text-xs font-light text-gray-700'>Other</div>
              <div className='text-2xl font-bold'>{otherCount}</div>
            </div>
            <div> <Link href='/protected/misreport/other'><BookText size={48} className='hover:text-[#24ed56]'/> </Link></div>
          </div>
       
        
          <div className='bg-white p-4 w-1/5 flex flex-row justify-between hover:bg-stone-50'>
            <div className='flex flex-col'>
              <div className='text-xs font-light text-gray-700'>Quantity</div>
              <div className='text-2xl font-bold'>{quantityCount}</div>
            </div>
            <div> <Link href='/protected/misreport/quantity'><Tally4 size={48} className='hover:text-[#24ed56]'/> </Link></div>
          </div>
      
      </div>
      <div className='flex flex-row justify-between my-4 '>
        <div className='bg-white p-4 w-6/12 hover:bg-stone-50'>
          <Allbarchart contractdata={contractmonths} caredata={caremonths} quntitydata={quntitymonths} otherdata={othermonths}/>
        </div>
        <div className='bg-white p-4 w-5/12 hover:bg-stone-50'>
          <Adoughnut contract={contractCount} care={careCount} other={otherCount} quntity={quantityCount} />
        </div>
      </div>
        <div className='flex flex-row justify-between'>
          <div className='bg-white p-4 w-1/5 felx flex-col hover:bg-stone-50'>
            <div className='text-sm hover:text-green-600 hover:font-semibold text-center'><Link href={'/protected/misreport/order'}>Total Order Count</Link></div>
            <p className='text-center text-lg font-semibold'>{totalCount}</p>
          </div>
          
          <div className='bg-white p-4 w-1/5 felx flex-col hover:bg-stone-50'>
          <div className='text-sm hover:text-green-600 hover:font-semibold text-center'><Link href={'/protected/misreport/process'}>Process order Count</Link></div>
            <p className='text-center text-lg font-semibold'>{processCount}</p>
          </div>
        
          <div className='bg-white p-4 w-1/5 felx flex-col hover:bg-stone-50'>
          <div className='text-sm hover:text-green-600 hover:font-semibold text-center'><Link href={'/protected/misreport/pending'}>Pending order Count</Link></div>
            <p className='text-center text-lg font-semibold'>{pendingCount}</p>
          </div>
          <div className='bg-white p-4 w-1/5 felx flex-col hover:bg-stone-50'>
          <div className='text-sm hover:text-green-600 hover:font-semibold text-center'><Link href={'/protected/misreport/complete'}>Completed order Count</Link></div>
            <p className='text-center text-lg font-semibold'>{completeCount}</p>
          </div>
        </div>
        

    </div>
  )
}

export default MISinterface