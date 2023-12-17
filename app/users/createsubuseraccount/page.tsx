import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Createuser from '@/components/Createuser';
import Createsubuser from '@/components/Createsubuser';

type Props = {}

const page = async (props: Props) => {

  const session = await getServerSession(authOptions);

  
  return (
    <div className='h-screen'>
      <Createsubuser id={session?.user.id as string}/>
    </div>
  )
}

export default page