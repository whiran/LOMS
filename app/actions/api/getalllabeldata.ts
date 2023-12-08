'use server'


import prisma from "@/lib/prisma";

//get all contracts data

export const constractdata =async () => {
  const result = await prisma.contract.findMany();
  return result;
}

export const caredata = async () => {
  const result = await prisma.carelabel.findMany();
  return result;
}

export const otherdata =async () => {
  const result = await prisma.otherlabel.findMany();
  return result;
}

export const quantitydata =async () => {
  const result = await prisma.contity.findMany();
  return result;
}