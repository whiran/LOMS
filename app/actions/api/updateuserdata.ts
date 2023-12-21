'use server'

import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs'

export const updateemailuser = async (id: string, nemail: string) => {

  try{
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email: nemail
      }
    })
    if(result){
      return 'ok'
    }else{
      return 'no'
    }
   
  }catch(error){
    console.log('error updating the user email');
    return 'no'
  }
}

export const updatepassworduser = async (id: string, pass: string, npass: string) => {

  const passwordU = bcrypt.hashSync(npass, 10);
  const passwordO = bcrypt.hashSync(pass, 10);

  try{
    const getmatch = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        password: true,
      }
    });//check the data whether the user input same or not
    if(passwordO === getmatch?.password){
      const upretust = await prisma.user.update({
        where: {
          id,
        },
        data: {
          password: passwordU,
        }
      });//if same then update the new one
      if(upretust){
        return 'ok'//return ok 
      }else{
        return 'no' // return no
      }
    }else{
      return 'notsame';// identify not same
    }

  }catch(error){
    console.log('error updating the user password');// error on server side 
    return 'error';
  }
}