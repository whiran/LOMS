'use server'

import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'
import { UserRoles } from "@prisma/client"




export const companysignup = async (firstname:string,lastname: string,bname: string,pnum: string, sa: string,sl: string,city: string,post: string, country: string,region: string, email:string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if(user){
    return 'user with that email alredy exists';
  }

  const passwordU = bcrypt.hashSync(password, 10);

  await prisma.company.create({
    data: {
      firstname,
      lastname,
      bname,
      pnum,
      sa,
      sl,
      city,
      post,
      country,
      region,
      email,
      password: passwordU
    }
  })

  await prisma.user.create({
    data: {
      email,
      password: passwordU,
      userType: UserRoles.admin,
    },
  });

  return "successfully created new user!";


}