'use client'
import React, { useEffect, useState } from 'react'
import { Aperture, Activity, BookText, Tally4 } from 'lucide-react'
import { getcarecount, getcontractcount, getothercount, getquntitycount } from '@/app/actions/api/countrecord'
import { getquntity } from '@/app/actions/api/getquntity'
import Link from 'next/link'
import Adoughnut from './Alldonought'
import { groupbycontractmonth, groupbyothermonth, groupbyquantitymonth } from '@/app/actions/api/getmonth'

type Props = {}

type MonthlyData = { month: number; count: number }[]; 

const MISinterface = (props: Props) => {

  const [contract, setContract] = useState<number>(0);
  const [care, setCare] = useState<number>(0);
  const [other, setOther] = useState<number>(0);
  const [quntity, setQuntity] = useState<number>(0);
  const [contractMonths, setContractMonths] = useState<MonthlyData>([]);
  const [careMonths, setCareMonths] = useState<MonthlyData>([]);
  const [otherMonths, setOtherMonths] = useState<MonthlyData>([]);
  const [quantityMonths, setQuantityMonths] = useState<MonthlyData>([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractCount = await getcontractcount();
        const careCount = await getcarecount();
        const otherCount = await getothercount();
        const quantityCount = await getquntitycount();
        const contractmonths = await  groupbycontractmonth();
        const caremonths = await groupbyothermonth();
        const othermonths = await groupbyothermonth();
        const quntitymonths = await groupbyquantitymonth();

        setContract(contractCount ?? 0);
        setCare(careCount ?? 0);
        setOther(otherCount ?? 0);
        setQuntity(quantityCount ?? 0);
        setContractMonths(contractmonths);
        setCareMonths(caremonths);
        setOtherMonths(othermonths);
        setQuantityMonths(quntitymonths);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='flex flex-col mx-4 my-4'>
      <div className='flex flex-row w-full justify-between'>
     
      <div className='bg-white p-4 w-1/5 flex flex-row justify-between hover:bg-stone-400'>
          <div className='flex flex-col'>
            <div className='text-xs font-light text-gray-700'>Contract</div>
            <div className='text-2xl font-bold'>{contract}</div>
          </div>
          <div> <Link href=''><Aperture size={48}/></Link></div>
        </div>
      
      
        <div className='bg-white p-4 w-1/5 flex flex-row justify-between hover:bg-stone-400'>
          <div className='flex flex-col'>
            <div className='text-xs font-light text-gray-700'>Care</div>
            <div className='text-2xl font-bold'>{care}</div>
          </div>
          <div><Link href=''><Activity size={48} /></Link></div>
        </div>
      
     
        <div className='bg-white p-4 w-1/5 flex flex-row justify-between hover:bg-stone-400'>
          <div className='flex flex-col'>
            <div className='text-xs font-light text-gray-700'>Other</div>
            <div className='text-2xl font-bold'>{other}</div>
          </div>
          <div> <Link href=''><BookText size={48} /> </Link></div>
        </div>
       
       
        <div className='bg-white p-4 w-1/5 flex flex-row justify-between hover:bg-stone-400'>
          <div className='flex flex-col'>
            <div className='text-xs font-light text-gray-700'>Quantity</div>
            <div className='text-2xl font-bold'>{quntity}</div>
          </div>
          <div> <Link href=''><Tally4 size={48} /> </Link></div>
        </div>
      
      </div>
      <div className='flex flex-row justify-between my-4 '>
        <div className='bg-white p-4 w-6/12 hover:bg-stone-50'>5</div>
        <div className='bg-white p-4 w-5/12 hover:bg-stone-50'>
          <Adoughnut contract={contract} care={care} other={other} quntity={quntity} />
        </div>
      </div>
      <div className='flex flex-row justify-between'>
        <div className='bg-white p-4 w-5/12'>7</div>
        <div className='bg-white p-4 w-6/12'>8</div>
      </div>
    </div>
  )
}

export default MISinterface