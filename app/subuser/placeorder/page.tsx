import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Placeorder from '@/components/Placeorder';
import { getcreatedcustomersstroke } from '@/app/actions/api/subuser/getcreatedcustomer';
import Placeorderforsub from '@/components/Placeorderforsub';
import Mainnavbar from '@/components/Mainnavbar';

type Props = {}

const page = async (props: Props) => {

  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string

  const result:string[] = await getcreatedcustomersstroke(userid)
  return (
    <div>
    <div className='h-screen flex flex-col'>
    <div className="h-[9vh]">
       <Mainnavbar />
    </div>
      <div className='flex justify-center items-center h-full'>
      <Placeorderforsub id={userid} strokes={result}/>
      </div>
    </div>
    
  </div>
  )
}

export default page