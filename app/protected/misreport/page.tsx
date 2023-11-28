'use server'
import MISinterface from "@/components/MISinterface"
import Mainnavbar from "@/components/Mainnavbar"
import Misreport from "@/components/Misreport"
import Dashord from '@/components/Dashord'

type Props = {}

const page = async (props: Props) => {
  
  //msi report view
  
  return (
    <div className="h-full">
      <Mainnavbar />
      <Dashord />
      <MISinterface />
      <Misreport />
    </div>
  )
}

export default page