
import Artwork from '@/components/artwork'
import Mainnavbar from '@/components/Mainnavbar'



type Props = {}

const Page = (props: Props) => {

  //view the art work main page

  return (
    
    <div className="relative bg-blue-200 w-full min-w-[938px] overscroll-x-none">
       <div className="h-[9vh]">
        <Mainnavbar />
       </div>
       <div className='h-full w-full'>
        <Artwork />
       </div>
    </div>
  )
}

export default Page