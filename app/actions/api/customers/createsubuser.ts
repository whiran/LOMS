'use server'

import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'

export const createsubuser = async (email: string, password: string, id: string) => {
  try{
    const custormer = await prisma.user.findUnique({
      where: {
        email,
      }
    });
    if(custormer){
      return 'no';
    }
    const passwordU = bcrypt.hashSync(password, 10);

    //get the customer id for cretae the connection between customer and subcustomer

    const cusno = await prisma.user.findUnique({
      where: {
        id,
      }
    })
   
    const user = await prisma.user.create({
      data: {
        email,
        password: passwordU,
        createdby: id,
        userType: 'subuser'

      }
    })
    const result = await prisma.subuser.create({
      data: {
        email,
        password: passwordU,
        createdby: id,
        ownid: user.id,
        createdbyuserid: cusno?.id as string,
      }
    })
    
    return 'ok'
  }catch(error){
    console.log('error when create a subuser')
    return 'no'
  }
}