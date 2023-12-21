import Mainnavbar from '@/components/Mainnavbar'
import Settings from '@/components/Settings'
import Settingtabs from '@/components/Settingtabs'
import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

type Props = {}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  
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