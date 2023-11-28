'use server'

import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'


//sign up code
//user give the email and password

export const signup = async ( email:string, password: string) => {
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
    },
  });

  return "successfully created new user!";


}