import React from 'react'
import Dashord from '@/components/Dashord'
import { getordercomplete, getorderpending, getorderprocessing, totalcount } from '@/app/actions/api/countorders';
type Props = {}

const page = async (props: Props) => {
  const processCountData = await getorderprocessing();
  const pendingCountData = await getorderpending();
  const completeCountData = await getordercomplete();
  const totalCountData = await totalcount();

  return (
    <div className='flex justify-center items-start h-screen'>
     <Dashord processCount={processCountData} pendingCount={pendingCountData} completeCount={completeCountData} totalCount={totalCountData}/>
    </div>
  )
}

export default page