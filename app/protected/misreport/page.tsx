import MISinterface from "@/components/MISinterface"
import Mainnavbar from "@/components/Mainnavbar"
import Misreport from "@/components/Misreport"

type Props = {}

const page = async (props: Props) => {
  

  return (
    <div className="h-full ">
      <Mainnavbar />
      <Misreport />
      <MISinterface />
    
    </div>
  )
}

export default page