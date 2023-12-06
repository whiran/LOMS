'use server'
import MISinterface from "@/components/MISinterface"
import Mainnavbar from "@/components/Mainnavbar"
import Misreport from "@/components/Misreport"
import Dashord from '@/components/Dashord'
import { getordercomplete, getorderpending, getorderprocessing, totalcount } from "@/app/actions/api/countorders"


type Props = {}

const page = async (props: Props) => {

  const processCountData = await getorderprocessing();
  const pendingCountData = await getorderpending();
  const completeCountData = await getordercomplete();
  const totalCountData = await totalcount();

  
  //msi report view
  
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[9vh]">
         <Mainnavbar />
      </div>
      <div className="h-full">
       <MISinterface processCount={processCountData} pendingCount={pendingCountData} completeCount={completeCountData} totalCount={totalCountData}/>
      </div>
    </div>
  )
}

export default page