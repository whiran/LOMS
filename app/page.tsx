import Image from 'next/image'
import Mainnavbar from '@/components/Mainnavbar'

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Sidebarcustomer from '@/components/Sidebarcustomer';
import Sidebar from '@/components/Sidebar';
import Sidebarsub from '@/components/Sidebarsub';
import Link from 'next/link';
import landingbg from '../public/landingbg.jpg'
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
      case 'subuser':
         return <Sidebarsub />
      default:
        
        
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
      <main style={{ 
        height: '100vh', overflowY: 'auto', }} className=' bg-[#4690a6]'>
        <div>
           <Mainnavbar />
       </div>
       <div className='flex flex-col h-full  overflow-auto'  >
          <div className='bg-[#72d0e1] h-[80vh] w-full flex flex-row'>
            <div className='flex flex-col justify-center items-center w-1/2 shadow'>
                 <p className=' sm:text-2xl md:text-5xl lg:text-6xl xl:text-7 xl leading-8 font-bold mx-auto'>Generate  your<br /><span className='underline decoration-sky-500'>Garment</span> Labels </p>
     
                 <Link href='/auth/signup'><button className='bg-gradient-to-r from-sky-500 to-indigo-500 w-44 text-lg font-normal  mt-6 rounded-lg p-2 border-2 border-slate-100 hover:bg-indigo-600 hover:p-3'>Start Generate</button></Link>
             </div>
             <div className=" w-1/2" style={{
                        backgroundImage: `url(${landingbg.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                          }}></div>
              <div></div>
          </div>
          <div className='h-full  items-center justify-center'>
            <div className='m-12  font-bold text-base text-center'>
            <p>Welcome to LabelGenius</p>
            <p>Create Custom Labels in Seconds</p>
            </div>
            <div className='font-normal text-base text-center mx-auto'>
                       <p>What is LabelGenius?
         LabelGenius is the ultimate solution for anyone needing quick and efficient label creation. Whether youre a small business owner, event organizer, or just someone in need of personalized labels, LabelGenius simplifies the process.</p>
                     </div>
                     <div>
            </div>
          </div>
       </div>
      </main>
    )}
    </div>
  )
  
}
