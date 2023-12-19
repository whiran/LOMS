
import Mainnavbar from '@/components/Mainnavbar'
import { UploadForm } from '@/components/Uploadform'
import React from 'react'

type Props = {}

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { getxmldata } from '@/app/actions/api/getxmldata';


const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string
  const xmldata = await getxmldata( userid) ;

  //upload the xml file to server 
  
  return (
    <div>
      <div className='h-screen flex flex-col'>
      <div className="h-[9vh]">
         <Mainnavbar />
      </div>
        <div className='flex justify-center items-center h-full'>
        <UploadForm id={userid} xml={xmldata}/>
        </div>
      </div>
      
    </div>
  )
}

export default page