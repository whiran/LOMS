'use server';

import prisma from "@/lib/prisma";

//get all storke data

export const getstrokedata =async (id:string) => {
  const stroke = await prisma.stroke.findMany({
    where: {
      userid: id,
    },
  })
  return stroke;
}

