import Createuser from '@/components/Createuser'
import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Mainnavbar from '@/components/Mainnavbar';



type Props = {}

const page = async (props: Props) => {

  const session = await getServerSession(authOptions);


  return (
    <div className='h-screen flex flex-col'>
    <div className="h-[9vh]">
       <Mainnavbar />
    </div>
    <div className='h-full'>
      <Createuser id = {session?.user.id as string} />
    </div>
    </div>
  )
}

export default page