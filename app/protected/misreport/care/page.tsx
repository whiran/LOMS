import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { gettherecords } from '@/app/actions/api/getalllabeldata';
import Tableforadmin from '@/components/Tableforadmin';
import Mainnavbar from '@/components/Mainnavbar';
import Tableforadmincare from '@/components/Tableforadmincare';

type Props = {}
type Care = {
  createdAt: Date;
  id: string;
  fibre: string;
}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string
  const result = await gettherecords(userid,'care') as Care[]

  
  return (
    <div>
    <div className='h-max flex flex-col w-full'>
    <div className="h-[9vh]">
       <Mainnavbar />
    </div>
      <div className='h-max  w-full flex justify-center items-center'>
      <Tableforadmincare result={result}/>
      </div>
    </div>
    </div>
  )
}

export default page