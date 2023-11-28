import ComReg from '@/components/ComReg'
import Dashord from '@/components/Dashord'
import Orderqty from '@/components/Orderqty'
import Placeorder from '@/components/Placeorder'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Orderqty />
    </div>
  )
}

export default page