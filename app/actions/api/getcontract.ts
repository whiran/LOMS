'use server';

import prisma from "@/lib/prisma";

export const getcontract =async (strokeno: string) => {
  const contracts = await prisma.contract.findMany({
    where: {
      stroke_id: strokeno,
    },
  });
 
  return contracts;
  
}