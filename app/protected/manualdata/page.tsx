import React from 'react'
import Placeorder from '@/components/Placeorder'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';


type Props = {}

const page = async (props: Props) => {
  //get the session
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id ?? 'oooooooooooo'
  
  
  return (
    <div className='flex justify-center items-center h-screen'>
      <Placeorder id={userid} />
    </div>
  )
}

export default page