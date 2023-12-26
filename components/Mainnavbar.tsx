
import Mobilesidebar from './Mobile-sidebar'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
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




const Mainnavbar = async () => {
  const session = await getServerSession(authOptions);
  const usertype = session?.user.userType;

  
  
  return (
    <div className='w-full   flex justify-between items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2'>
      {session && session.user.email ? (<Mobilesidebar apiLimitCount={0} isPro={false}/>):(<div></div>)}
      
      <div className=' mr-2 text-sm lg:text-base xl:text-lg w-full flex justify-end'>
        {session && session.user?.email ? (
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
          ):(
          <>
          <Link className='mx-1 hover:bg-sky-700 p-2 rounded-md' href='/auth/signup'>Signup</Link>
          <Link className='mx-1 hover:bg-sky-700 p-2 rounded-md' href='/auth/signin'>Signin</Link>
          </>
        )}
        
      </div>
      </div>
  )
}

export default Mainnavbar