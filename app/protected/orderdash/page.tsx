import React from 'react'
import Dashord from '@/components/Dashord'
import { getordercomplete, getorderpending, getorderprocessing, totalcount } from '@/app/actions/api/countorders';
import { getordercompletebasedid, getorderpendingbasedid, getorderprocessingbasedid, totalcountbasedid } from '@/app/actions/api/countordersbasedonuserid';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Mainnavbar from '@/components/Mainnavbar';
type Props = {}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);

  const processCountData = await getorderprocessingbasedid(session?.user.id as string);
  const pendingCountData = await getorderpendingbasedid(session?.user.id as string);
  const completeCountData = await getordercompletebasedid(session?.user.id as string);
  const totalCountData = await totalcountbasedid(session?.user.id as string);

  return (
    <div>
    <div className='h-screen flex flex-col'>
    <div className="h-[9vh]">
       <Mainnavbar />
    </div>
      <div className='flex justify-center items-center h-full'>
      <Dashord processCount={processCountData} pendingCount={pendingCountData} completeCount={completeCountData} totalCount={totalCountData}/>
      </div>
    </div>
    
  </div>
  )
}

export default page