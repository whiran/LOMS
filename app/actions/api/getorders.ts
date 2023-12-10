'use server';

import prisma from "@/lib/prisma";

//get orders

export const getorders = async() =>{
  const result = prisma.order.findMany();
  return result;
}

//find uniques order
export const getorderdata =async (id: string) => {
  const result = prisma.order.findUnique({
    where:{
      id: id
    }
  });
    return result;

}

//get processing orders

 export const getprocessingorders =async () => {
  const result = prisma.order.findMany({
    where: {
      state : "processing"
    }
  });
  return result;
 }
//get pending orders

export const getpendingorders =async () => {
  const result = prisma.order.findMany({
    where: {
      state:"pending"
    }
  });
  return result;

}
//get completed orders

export const getcompletedorders = async () => {
  const result = prisma.order.findMany({
    where: {
      state: 'completed'
    }
  });
  return result;
}


//get all orders based on specific user

export const getallusersorders =async (id: string) => {
  const result = prisma.order.findMany({
    where: {
      userid: id
    }
  });
  return result;
}

//get processing orders and specific user

export const getprocessinguserorders =async (id: string) => {
  const result = prisma.order.findMany({
    where: {
      userid: id,
      state : "processing"
    }
  });
  return result;
 }

 //get pending orders and specific user

export const getpendinusergorders =async (id: string) => {
  const result = prisma.order.findMany({
    where: {
      userid: id,
      state:"pending"
    }
  });
  return result;

}

//get completed orders and specific user

export const getcompleteduserorders = async (id: string) => {
  const result = prisma.order.findMany({
    where: {
      userid: id,
      state: 'completed'
    }
  });
  return result;
}