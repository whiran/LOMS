'use server';

import prisma from "@/lib/prisma";

//get all storke data

export const getstrokedata =async () => {
  const stroke = await prisma.stroke.findMany()
  return stroke;
}

