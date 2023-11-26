'use server';

import prisma from "@/lib/prisma";

//get the carelael based on contract id relation

export const getcare =async (state1: string) => {
  const cares = await prisma.carelabel.findMany({
    where: {
      contract_id: state1,
    },
  });
 
  return cares;
  
}