'use server'

import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'

export const updatecusdata = async (email:string, emailup: string, password: string) => {
  if(email && password && emailup){
    const passwordU = bcrypt.hashSync(password, 10);

    
    if(email === emailup){
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
      const check = await prisma.customer.findUnique({
        where: {
          email: emailup,
        }
      });
      
      if(check){
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