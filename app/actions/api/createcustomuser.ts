'use server'
import prisma from "@/lib/prisma"
import { UserRoles } from "@prisma/client";
import bcrypt from 'bcryptjs'

export const createcustomuser = async (email: string, password: string, id: string) => {
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

  const resutl =  await prisma.user.create({
    data: {
      email,
      password: passwordU,
      createdby: id,
      userType: UserRoles.user
    }
  }
  )
  const resuttow = await prisma.customer.create({
    data:{
      email,
      password: passwordU,
      createdby: id,
      ownid: resutl.id
    }
  })
  return 'ok'
}catch(error){
  return 'no'
}
}