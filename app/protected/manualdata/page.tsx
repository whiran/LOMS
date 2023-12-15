import React from 'react'
import Placeorder from '@/components/Placeorder'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Mainnavbar from '@/components/Mainnavbar';
import { getstrokenum } from '@/app/actions/api/getstrokenum';


type Props = {}

const page = async (props: Props) => {
  //get the session
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string
  const result:string[] = await getstrokenum(userid);
  
  return (
    <div>
    <div className='h-screen flex flex-col'>
    <div className="h-[9vh]">
       <Mainnavbar />
    </div>
      <div className='flex justify-center items-center h-full'>
      <Placeorder id={userid} strokes={result}/>
      </div>
    </div>
    
  </div>
  )
}

export default page