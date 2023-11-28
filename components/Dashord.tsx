'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BarChartBig, FileBarChart, CalendarCheck2 ,  CircleEllipsis, ChevronRight } from 'lucide-react'
import { getordercomplete, getorderpending, getorderprocessing, totalcount } from '@/app/actions/api/countorders'

type Props = {}

const Dashord = (props: Props) => {
  const [processCount, setProcessCount] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [completeCount, setCompleteCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() =>{
    const fetchthedata = async() =>{
      const processCountData = await getorderprocessing();
      const pendingCountData = await getorderpending();
      const completeCountData = await getordercomplete();
      const totalCountData = await totalcount();

      console.log(processCount,pendingCount,completeCount,totalCountData);

      setProcessCount(processCountData || 0);
      setPendingCount(pendingCountData || 0);
      setCompleteCount(completeCountData || 0);
      setTotalCount(totalCountData || 0);
    }
    fetchthedata();
  },[])

  return (
    <div className='flex flex-col w-full h-screen bg-slate-200'>
      <div className='flex flex-row w-full  bg-slate-400 justify-around'>


        <div className='flex flex-col w-1/5 h-32  m-2'>
          <div className='h-3/5  p-2 bg-slate-200'>
            <div className='flex flex-row w-full justify-around'>
              <div className='flex flex-col'>
                <div className='h-3/4 text-2xl text-red-600 font-bold'>{totalCount}</div>
                <div className='h-1/4 text-sm text-slate-800'>All Orders</div>
              </div>
              <div className='flex justify-center items-center'>
               <BarChartBig size={48} />
              </div>
            </div>
          </div>
          <Link href='' className='bg-sky-600 h-2/5'>
          <div className='p-2 cursor-pointer flex'>View Details <ChevronRight /></div>
          </Link>
        </div>


        <div className='flex flex-col w-1/5 h-32  m-2'>
          <div className='h-3/5  p-2 bg-slate-200'>
            <div className='flex flex-row w-full justify-around'>
              <div className='flex flex-col'>
                <div className='h-3/4 text-2xl text-red-600 font-bold'>{completeCount}</div>
                <div className='h-1/4 text-sm text-slate-800'>Completed Orders</div>
              </div>
              <div className='flex justify-center items-center'>
                <FileBarChart size={48} />
              </div>
            </div>
          </div>
          <Link href='' className='bg-green-500 h-2/5'>
          <div className='p-2 cursor-pointer flex'>View Details <ChevronRight /></div>
          </Link>
        </div>

        <div className='flex flex-col w-1/5 h-32  m-2'>
          <div className='h-3/5  p-2 bg-slate-200'>
            <div className='flex flex-row w-full justify-around'>
              <div className='flex flex-col'>
                <div className='h-3/4 text-2xl text-red-600 font-bold'>{processCount}</div>
                <div className='h-1/4 text-sm text-slate-800'>Processing Orders</div>
              </div>
              <div className='flex justify-center items-center'>
                <CalendarCheck2 size={48} />
              </div>
            </div>
          </div>
          <Link href='' className='bg-sky-400 h-2/5'>
          <div className='p-2 cursor-pointer flex'>View Details <ChevronRight /></div>
          </Link>
        </div>


        <div className='flex flex-col w-1/5 h-32  m-2'>
          <div className='h-3/5  p-2 bg-slate-200'>
            <div className='flex flex-row w-full justify-around'>
              <div className='flex flex-col'>
                <div className='h-3/4 text-2xl text-red-600 font-bold'>{pendingCount}</div>
                <div className='h-1/4 text-sm text-slate-800'>Pending Orders</div>
              </div>
              <div className='flex justify-center items-center'>
                <CircleEllipsis size={48}/>
              </div>
            </div>
          </div>
          <Link href='' className='bg-rose-400 h-2/5'>
          <div className='p-2 cursor-pointer flex'>View Details <ChevronRight /></div>
          </Link>
        </div>


      </div>
    </div>
  )
}

export default Dashord