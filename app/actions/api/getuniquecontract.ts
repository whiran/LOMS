'use server'

import prisma from "@/lib/prisma"
//find the contract and return the datails 

export  const getuniquescontract = async (id: string) => {
  const contract = await prisma.contract.findUnique({
    where: {
      constractno: id,
    }
  });
  return contract;

}