'use client'
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import { useMyContext } from '@/context/MyContext';
import Sidebarcustomer from './Sidebarcustomer';
import Sidebarsub from './Sidebarsub';

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
  const userrole = session?.user.userType as string;
  
  //render the different sidebars

  const rendersidebar =  () => {
    switch(userrole){
      case 'admin':
        return <Sidebar />;
      case 'user':
        return <Sidebarcustomer />;
      case 'subuser':
        return <Sidebarsub />;
      default:
        
    }
  }

  
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
        {rendersidebar()}
      </SheetContent>
    </Sheet>
  );
}

export default Mobilesidebar