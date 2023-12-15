import Image from 'next/image'
import Mainnavbar from '@/components/Mainnavbar'


//main page

export default function Home() {
  console.log()
  return (
   <div className='h-screen bg-slate-100'>
    <div>
    <Mainnavbar />
    </div>
    <div className='flex justify-center items-center bg-white m-10 p-10 rounded-lg h-5/6 shadow-xl overflow-auto'>
      <Image src='/background.jpg' alt='background' width={500} height={500} className='w-[80%] h-[80%]'/>
    </div>
   </div>
  )
}
