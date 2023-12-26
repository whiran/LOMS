'use server'

import prisma from "@/lib/prisma";

//get the artwork numbers

export const getstrokenum = async (id:string) => {
  const stroke = await prisma.stroke.findMany({
    where: {
      userid: id,
    },
  });

  const strokenums = stroke.map(s => s.strokeno);
  return strokenums;
}