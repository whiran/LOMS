'use server'
import prisma from "@/lib/prisma";


export const  getcustomusers = async (id: string) => {
  
  const result = await prisma.user.findMany({
    where: {
      createdby: id
    },
  });

  return result;
}