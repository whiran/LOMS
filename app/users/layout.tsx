import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Mainnavbar from "@/components/Mainnavbar";
import Provider from "@/components/Provider";
import { MyProvider } from "@/context/MyContext";
import { Toaster } from "@/components/ui/toaster";
import Sidebarcustomer from "@/components/Sidebarcustomer";



//protected view layout for admin

const Layout = async({
 children
}:{
 children: React.ReactNode;
}) => {


 
 return (
   //for admin
   <>
   <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 lg:flex lg:w-[20%] lg:flex-col lg:fixed lg_inset-y-0">
     <Sidebarcustomer />
   </div>
   <main className="md:pl-72 lg:pl-[20%]">

     {children}
    
   </main>
 </>
 );
}

export default Layout;