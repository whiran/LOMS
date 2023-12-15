'use server';

import prisma from "@/lib/prisma";
//for admin
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


//get all orders based on specific user as admin with ther customers and their subcustomers 

export const getallusersorders =async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      order: true,
      customers: {
        select: {
          orders: true,
          subusers: {
            select: {
              orders: true,
            },
          },
        },
      },
    },
  });

 if(user){
   // Step 1: Count orders made by the user
   const userOrderCount = user.order.length;

   // Step 2: Count orders made by the customers of the user
   let customerOrderCount = 0;
   user.customers.forEach((customer) => {
     customerOrderCount += customer.orders.length;
 
     // Count orders made by subusers of the customer
     customer.subusers.forEach((subuser) => {
       customerOrderCount += subuser.orders.length;
     });
   });
 
   // Step 3: Calculate the total order count (user's orders + customer's orders)
   const totalOrderCount = userOrderCount + customerOrderCount;
 
   return totalOrderCount;
 }
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