import React from 'react'
import Orderqty from '@/components/Orderqty'
import { getorders } from '@/app/actions/api/getorders';
type Props = {}

const page = async (props: Props) => {
  const fetcheddata = await getorders();
  
  return (
    <div className='flex justify-center items-center h-screen'>
      <Orderqty orders={fetcheddata}/>
    </div>
  )
}

export default page