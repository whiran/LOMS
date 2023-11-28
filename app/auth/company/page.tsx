import ComReg from '@/components/ComReg'
import Orderqty from '@/components/Orderqty'
import Placeorder from '@/components/Placeorder'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex justify-center items-center bg-state-50 w-full h-full'>
      <div className='w-3/6'>
       <ComReg />
      </div>
    </div>
  )
}

export default page