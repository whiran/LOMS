import Image from 'next/image'
import Mainnavbar from '@/components/Mainnavbar'

export default function Home() {
  return (
   <div className='h-screen bg-slate-100'>
    <div>
    <Mainnavbar />
    </div>
    <div className='flex flex-row bg-white m-10 p-10 rounded-lg h-5/6 shadow-xl overflow-auto'>
      <Image src='/background.jpg' alt='background' width={1000} height={500} />
    </div>
   </div>
  )
}
