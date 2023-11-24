'use server';

import prisma from "@/lib/prisma";

//get other details based on care label id relation

export const getother =async (state2: string) => {
  const cares = await prisma.otherlabel.findMany({
    where: {
      carelabel_id: state2,
    },
  });
 
  return cares;
  
}