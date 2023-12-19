import React from 'react'
import Orderqty from '@/components/Orderqty'
import { getorders } from '@/app/actions/api/getorders';
import Mainnavbar from '@/components/Mainnavbar';
type Props = {}

const page = async (props: Props) => {
  const fetcheddata = await getorders();
  const updatedQuantities: { [key: string]: number } = {};
  const result = fetcheddata.forEach((order) => {
    if (order.qty !== null) {
      updatedQuantities[order.id] = order.qty;
    }
  })

  
  return (
    <div>
    <div className='h-screen flex flex-col'>
    <div className="h-[9vh]">
       <Mainnavbar />
    </div>
      <div className='flex justify-center items-center h-full'>
      <Orderqty orders={fetcheddata} val={updatedQuantities}/>
      </div>
    </div>
    
  </div>
    
  )
}

export default page