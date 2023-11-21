'use server';

import prisma from "@/lib/prisma";

export const getother =async (state2: string) => {
  const cares = await prisma.otherlabel.findMany({
    where: {
      carelabel_id: state2,
    },
  });
 
  return cares;
  
}