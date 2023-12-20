import Image from 'next/image'
import Mainnavbar from '@/components/Mainnavbar'

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Sidebarcustomer from '@/components/Sidebarcustomer';
import Sidebar from '@/components/Sidebar';
import Sidebarsub from '@/components/Sidebarsub';
//main page

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userType:string = session?.user.userType as string
  

  const rendercom = () => {
    switch(userType){
      case 'admin':
        return <Sidebar />
      case 'user' :
        return <Sidebarcustomer />
      case 'subuser':``
         return <Sidebarsub />
      default:
         <Sidebar/>
        
    }
  }
  return (
    <div>
    {userType?(
      <>
       <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 lg:flex lg:w-[20%] lg:flex-col lg:fixed lg_inset-y-0">
            {rendercom()}
      </div>
       <main className="md:pl-72 lg:pl-[20%]">
       <div>
           <Mainnavbar />
       </div>
       <div className='flex justify-center items-center bg-white m-10 p-10 rounded-lg h-full shadow-xl overflow-auto'>
         <Image src='/background.jpg' alt='background' width={500} height={500} className=''/>
      
       </div>
       </main>
   </>
    ):(
      <main>
        <div>
           <Mainnavbar />
       </div>
       <div className='flex justify-center items-center bg-white  p-10 rounded-lg h-full  overflow-auto'>
         <Image src='/background.jpg' alt='background' width={500} height={500} className=''/>
      
       </div>
      </main>
    )}
    </div>
  )
  
}
