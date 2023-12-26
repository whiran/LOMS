import { Order, columns } from "@/app/users/misreport/total/columns"
import { DataTable } from "@/app/users/misreport/total/data-table"
import Mainnavbar from "@/components/Mainnavbar";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { getallorderdata } from "@/app/actions/api/customers/getallorderdata";



type order = {
  id: string;
  amount: number | null;
  status: string;
  stroke: string;
}

export default async function DemoPage() {
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string

  const result:Order[] = await getallorderdata(userid)

  return (
    <div>
    <div className='h-max flex flex-col'>
    <div className="h-[9vh]">
       <Mainnavbar />
    </div>
      <div className='h-max p-0 m-0 w-full flex justify-center items-center'>
       <DataTable columns={columns} data={result} />
      </div>
    </div>
    </div>
  )
}
