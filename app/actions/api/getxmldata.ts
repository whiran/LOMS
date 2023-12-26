'use server'
import prisma from "@/lib/prisma"
//get the xml data based on adin

export const getxmldata = async (id: string) => {
  const resut = await prisma.label.findMany({
    select: {
      id: true,
      createdAt: true,
    }
  });
  return resut;
}