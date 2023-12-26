'use client'
import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, Component, FileText, Settings, FileBarChart, FormInput, FolderPlus, Grid2X2, Gauge, Scroll, UserPlus  } from "lucide-react";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Colors } from "chart.js";
import { useSession } from "next-auth/react"




const routesone = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/protected/dashbord',
    color: "text-sky-500"
  },
  {
    label: 'ArtWorks',
    icon: Component,
    href: '/protected/artwork',
    color: "text-violet-500",
  },
  {
    label: 'Input data',
    icon: FileText,
    color: "text-pink-700",
    href: '/protected/inputdata',
  },
  {
    label: 'MIS report',
    icon: FormInput,
    color: "text-rose-600",
    href: '/protected/misreport'
  },
  {
    label: 'Enter Order',
    icon: FolderPlus,
    color: 'text-amber-500',
    href: '/protected/manualdata'
  },
  {
    label: 'create user account',
    icon: UserPlus,
    color: "text-yellow-300",
    href: '/protected/createuser'
  }
];

const routestwo =[
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/users/dashbord',
    color: "text-sky-500"
  },
  {
    label: 'ArtWorks',
    icon: Component,
    href: '/users/artworks',
    color: "text-violet-500",
  },
  {
    label: 'MIS report',
    icon: FormInput,
    color: "text-rose-600",
    href: '/users/misreport'
  },
  {
    label: 'Enter Order',
    icon: FolderPlus,
    color: 'text-amber-500',
    href: '/users/placeorders'
  },
  {
    label: 'Order dashbord',
    icon: Gauge ,
    color: "text-yellow-950",
    href: '/protected/orderdash'
  },
  {
    label: 'create user account',
    icon: UserPlus,
    color: "text-yellow-300",
    href: '/users/createsubuseraccount'
  }
];

const routetree = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/subuser/dashbord',
    color: "text-sky-500"
  },
  {
    label: 'ArtWorks',
    icon: Component,
    href: '/subuser/artwork',
    color: "text-violet-500",
  },
  {
    label: 'MIS report',
    icon: FormInput,
    color: "text-rose-600",
    href: '/subuser/misreport'
  },
  {
    label: 'Enter Order',
    icon: FolderPlus,
    color: 'text-amber-500',
    href: '/subuser/placeorder'
  },
  {
    label: 'Order dashbord',
    icon: Gauge ,
    color: "text-yellow-950",
    href: '/subuser/orderdash'
  }
]



const Sidebar = () => {

  // const { data: session, status } = useSession();
  // const getroutes = () =>{
  //   if(session?.user.userType == 'admin'){
  //     return routesone;
  //  }else if(session?.user.userType == 'user'){
  //   return routestwo;
  //  }else if(session?.user.userType == 'subuser'){
  //   return routetree;
  //  }else{
  //   return []
  //  }
  // }
  
  const routes = routesone

  
  
  
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#96B6C5] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href='/' className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
          <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className="text-2xl font-bold">IPFS</h1>
        </Link>
        
        <div className="space-y-1">
        {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className=
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
        
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
              ))}
           
          
        </div>
     
      </div>
     
    </div>
  )
}

export default Sidebar