
import Care from "@/components/Care";
import Contract from "@/components/Contract";
import Mainnavbar from "@/components/Mainnavbar";
import Navbar from "@/components/Navbar";
import Other from "@/components/Other";
import Quantity from "@/components/Quantity";



const Page = () => {

  //main dashbord to view and add data to the stroke, contract, care, other

  return (
  <div className="h-full">
    <div className="h-[9vh]">
    <Navbar />
    </div>
     <main className="grid grid-cols-1 grid-rows-4  bg-slate-100 h-[91vh] ">
     <div className='flex border-8 bg-white  border-white rounded-sm m-1 relative'>
      <Contract />
     </div>
     <div className='flex border-8 bg-white  border-white rounded-sm m-1'>
      <Care />
     </div>
     <div className='flex border-8 bg-white  border-white rounded-sm m-1'>
      <Other />
     </div>
     <div className='flex border-8 bg-white  border-white rounded-sm m-1'>
      <Quantity />
     </div>
     </main>
    </div>
  );
}

export default Page