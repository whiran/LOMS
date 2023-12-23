
import Artwork from '@/components/artwork'
import Mainnavbar from '@/components/Mainnavbar'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { getstrokedata } from '@/app/actions/api/getstrokedata';
import Navbar from '@/components/Navbar';


type Props = {}

type stroke = {
    strokeno: string;
}

type all = {
  strokeno: string;
  contractNumbers: string[];
}

const Page = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const userid:string = session?.user.id as string
  const strokedata:all[] = await getstrokedata(userid);
  //view the art work main page

  return (
    
    <div className="h-screen flex flex-col">
       <div className="h-[9vh]">
        <Navbar />
       </div>
       <div className='h-full w-full'>
        <Artwork userid={userid} strokedata={strokedata}/>
       </div>
    </div>
  )
}

export default Page