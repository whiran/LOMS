import React from 'react'
import Orderqty from '@/components/Orderqty'
type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Orderqty />
    </div>
  )
}

export default page