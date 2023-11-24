'use server';

import prisma from "@/lib/prisma";

//create a stroke 


export const createstroke =async (strokeno: string) => {
  const stroke = await prisma.stroke.findUnique({
    where: {
      strokeno,
    },
  });

  if(!stroke){
    await prisma.stroke.create({
      data: {
        strokeno,
      }
    });
    return "Successfully created new strokeno";
  }else{
    return "Successfully created new strokeno";
  }
    
  
  
}