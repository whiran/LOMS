
import Artwork from '@/components/artwork'
import Mainnavbar from '@/components/Mainnavbar'



type Props = {}

const Page = (props: Props) => {


  return (
    
    <div className="h-screen relative bg-blue-200">
       <div className="h-[9vh]">
        <Mainnavbar />
       </div>
       <Artwork />
    </div>
  )
}

export default Page