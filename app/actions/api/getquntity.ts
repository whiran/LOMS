'use server';

import prisma from "@/lib/prisma";

//get quntity data based on other label id relationship

export const getquntity =async (state3: string) => {
  const cares = await prisma.contity.findMany({
    where: {
      otherlabel_id: state3,
    },
  });
 
  return cares;
  
}