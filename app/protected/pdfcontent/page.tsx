

import { getorders } from '@/app/actions/api/getorders';
import Orderlits from '@/components/Orderlits';
import Pdfviewon from '@/components/Pdfviewon'
import React from 'react'

type Props = {}



const page = async (props: Props) => {
  const fetcheddata = await getorders();
  
  return (
    <div className='flex justify-center items-center h-screen'>
      <Orderlits orders={fetcheddata} />
    </div>
  )
}

export default page