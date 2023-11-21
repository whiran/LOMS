'use server'

import prisma from "@/lib/prisma"

export  const getuniquescontract = async (id: string) => {
  const contract = await prisma.contract.findUnique({
    where: {
      constractno: id,
    }
  });
  return contract;

}