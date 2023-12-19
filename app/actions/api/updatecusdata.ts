'use server'

import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'

export const updatecusdata = async (email:string, emailup: string, password: string) => {
  console.log(email,emailup)
  if(email && password && emailup){
    const passwordU = bcrypt.hashSync(password, 10);

    
    if(email === emailup){
      console.log('same')
      const updateuser = await prisma.customer.update({
        where: {
          email,
        },
        data: {
          password: passwordU,
        }
      })
      if(updateuser){
        return 'ok'
      }
    }else{
      console.log('not same')
      const check = await prisma.customer.findUnique({
        where: {
          email: emailup,
        }
      });
      
      if(check){
        console.log(check)
        return 'almost there'
      }
      const updateuser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          password: passwordU,
          email: emailup
        }
      })
      if(updateuser){
        return 'ok'
      }
    }
    
  
  
  }
}