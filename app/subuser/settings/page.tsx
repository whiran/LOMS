import Mainnavbar from '@/components/Mainnavbar'
import Settingtabs from '@/components/Settingtabs'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='bg-slate-300 h-screen'>
    <div className="h-[9vh]">
     <Mainnavbar />
   </div>
    <div>
    <Settingtabs />
    </div>
  </div>
  )
}

export default page