 import Navbar from "@/components/Navbar";
 import Sidebar from "@/components/Sidebar";
 import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Mainnavbar from "@/components/Mainnavbar";



//protected view layout

 const DashbordLayout = async({
  children
}:{
  children: React.ReactNode;
}) => {

  //check the session
  const session = await getServerSession(authOptions);
  
  
  if(!session || !session.user?.email){
    //if it is not show this content
    return(
      <div className="h-screen  flex flex-col bg-blue-100">
         <div className="h-[9vh]">
           <Mainnavbar />
         </div>
          <div className="flex justify-center items-center h-full">
            <p className="text-red-500 text-3xl">You don&apos;t have access to this page! Please sign in.</p>
          </div>
      </div>
    )
  }
  return (
    //if the session is available allow the children
      <div className="h-full bg-slate-100">  
        {children}
      </div>
  );
}

export default DashbordLayout;