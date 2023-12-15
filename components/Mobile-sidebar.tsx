'use client'
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import { useMyContext } from '@/context/MyContext';

const Mobilesidebar = (
  {
    apiLimitCount = 0,
    isPro = false
  }: {
    apiLimitCount: number;
    isPro: boolean;
  }
) => {
  const [isMounted, setIsMounted] = useState(false);
  const {state6, setState6} = useMyContext();
  const { data: session, status } = useSession();
  setState6(session?.user.id as string);
  console.log(state6);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  
  
  return (
    <Sheet>
      
       
          <SheetTrigger>
            <Menu  className='md:hidden'/>
          </SheetTrigger>
        
     
      <SheetContent side="left" className='p-0'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export default Mobilesidebar