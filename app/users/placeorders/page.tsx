import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { getcreatedusersstrokes } from '@/app/actions/api/customers/getcreatedusersstrokes';
import Placeorder from '@/components/Placeorder';
import Mainnavbar from '@/components/Mainnavbar';

type Props = {}

const Page = async(props: Props) => {

  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string
  const strokes:string[] =  await getcreatedusersstrokes(userid);

  return (
    <div>
    <div className='h-screen flex flex-col'>
    <div className="h-[9vh]">
       <Mainnavbar />
    </div>
      <div className='flex justify-center items-center h-full'>
      <Placeorder id={userid} strokes={strokes}/>
      </div>
    </div>
    
  </div>
  )
}

export default Page