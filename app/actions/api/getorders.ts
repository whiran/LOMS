'use server';

import prisma from "@/lib/prisma";

//get orders

export const getorders = async() =>{
  const result = prisma.order.findMany();
  return result;
}