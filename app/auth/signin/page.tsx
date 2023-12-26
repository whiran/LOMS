import Signinform from "@/components/Signinform"
import Link from "next/link"


type Props = {}

const Signin = (props: Props) => {
  return (
    <div className='flex flex-col bg-zinc-600 h-screen w-full '>
      <div className="h-[9vh] w-full flex justify-end items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <Link className='mx-1 hover:bg-sky-700 p-2 rounded-md' href='/auth/signup'>Signup</Link>
      </div>
   
    <div className="flex justify-center items-center h-full">
     <Signinform />
    </div>
    </div>
  )
}

export default Signin