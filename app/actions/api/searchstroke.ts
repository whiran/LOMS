'use server';

import prisma from "@/lib/prisma";

export const searchstroke =async (strokeno: string) => {
  const stroke = await prisma.stroke.findUnique({
    where: {
      strokeno,
    },
  });
  if(!stroke){
    return 'strokenotfound';
  }else{
    return 'strokefound';
  }

}