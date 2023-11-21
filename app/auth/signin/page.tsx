import Signinform from "@/components/Signinform"


type Props = {}

const Signin = (props: Props) => {
  return (
    <div className='flex flex-col bg-zinc-600 h-screen w-full justify-center items-center'>
    <Signinform />
    </div>
  )
}

export default Signin