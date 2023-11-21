'use server';

import prisma from "@/lib/prisma";


export const getart = async(contractno: string) => {
  const arts = await prisma.art.findMany({
    where:{
      contract_id: contractno,
    }
  });
  

  return arts;
}