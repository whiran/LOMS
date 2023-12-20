import Mainnavbar from '@/components/Mainnavbar'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { getcusorderspending, getorders, getpendingorders } from '@/app/actions/api/getorders';
import { Text} from 'lucide-react'
import Link from 'next/link';


type Props = {}

const page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string

  const fetcheddata = await getcusorderspending(userid);
  return (
    <div className='bg-slate-100 h-screen flex flex-col'>
    <div className="h-[9vh]">
       <Mainnavbar />
     </div>
     <div>
     <h1 className='font-bold text-center'>Pending Order Details:</h1>
     <table className='m-auto bg-white w-[80%] overflow-auto'>
       <thead className='p-2 bg-emerald-400 w-full'>
         <tr className="border-b-2">
           <th className="font-normal text-left">Date</th>
           <th className="font-normal text-left">Created User Id</th>
           <th className="font-normal text-left">Ourside</th>
           <th className="font-normal text-left">Customerside</th>
           <th className='w-6'></th>
         </tr>
         </thead>
       <tbody>
         {fetcheddata.map(data => (
           <tr key={data.id} className="border-b-2 hover:bg-slate-300">
             <td>{`${data.createdAt.getUTCDate()}/${data.createdAt.getMonth() + 1}/${data.createdAt.getUTCFullYear()}`}</td>
             <td>{data.userid}</td>
             <td>{data.state}</td>
             <td>{data.orderstatefromuser}</td>
             <td className='w-6'><Link href={`/protected/misreport/pending/${data.id}`}><Text className='hover:text-cyan-400'/></Link></td>
           </tr>
         ))}
       </tbody>
     </table>
     </div>
   </div>
  )
}

export default page