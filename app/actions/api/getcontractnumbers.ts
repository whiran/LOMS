'use server'

import prisma from "@/lib/prisma";

export const getcontractnumbers = async (strokeno: string) => {
  const contracts = await prisma.contract.findMany({
    where: {
      stroke_id: strokeno,
    },
  });

  const connumbers = contracts.map(con => con.constractno);
  return connumbers;
}