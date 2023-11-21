'use server';

import prisma from "@/lib/prisma";

export const getstrokedata =async () => {
  const stroke = await prisma.stroke.findMany()
  return stroke;
}

