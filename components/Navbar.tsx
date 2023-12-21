import React from 'react'
import Mobilesidebar from './Mobile-sidebar'
import Navbarsearch from './Navbarsearch'
import Profile from './Profile'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'



type Props = {}

const Navbar = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const usertype = session?.user.userType;

  return (
    <div className='flex items-center p-2 bg-[#ADC4CE] text-white text-sm w-full gap-2'>
      <Mobilesidebar apiLimitCount={0} isPro={false}/>
      <Navbarsearch />
      <DropdownMenu>
      <DropdownMenuTrigger  asChild>
         <Button variant="ghost" className="relative h-8 w-8 rounded-full" >
              <Avatar>
                <AvatarImage src="/124599.jpeg" alt='user' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>
        {usertype === 'admin' ? (
                <DropdownMenuItem>
                  <Link href='/protected/settings'>Settings</Link>
                </DropdownMenuItem>
              ) : usertype === 'user' ? (
                <DropdownMenuItem>
                  <Link href='/users/settings'>Settings</Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <Link href='/subuser/settings'>Settings</Link>
                </DropdownMenuItem>
              )}
        <DropdownMenuSeparator />
        <DropdownMenuItem><Link href='/auth/signout'>Log out</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>


    </div>
  )
}

export default Navbar