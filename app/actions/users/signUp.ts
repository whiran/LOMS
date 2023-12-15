'use server'

import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'


//sign up code
//user give the email and password

export const signup = async (firstname:string,lastname: string,pnum: string, sa: string,sl: string,city: string,post: string, country: string,region: string, email:string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if(user){
    return 'user with that email alredy exists';
  }

  const passwordU = bcrypt.hashSync(password, 10);
  
  await prisma.user.create({
    data: {
      email,
      password: passwordU,
      normaluser: {
        create: {
          firstname,
          lastname,
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
      }
    },
  });

  return "successfully created new user!";


}