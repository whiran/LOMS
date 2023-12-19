'use server';

import Orderlits from "@/components/Orderlits";
import prisma from "@/lib/prisma";
//for admin
//get orders

export const getorders = async(id: string) =>{
  const result = prisma.order.findMany({
    where: {
      userid: id,
    }
  });
  return result;
}

//orders data
//get sub and cus order list
export const getcusorders = async(id: string) => {
  try{
    //get the customers created by the user and get the count of total orders.
    const userData = await prisma.user.findMany({
      where: {
        createdby: id
      },
      select: {
        order: {
          select: {
            id: true,
          }
        },
        subusers: {
          select: {
            orders: {
              select: {
                id: true,
              }
            }
          }
        }
      }
    })
    let orderIds: string[] = [];

    // Get order IDs from main users
    userData.forEach((user) => {
      if (user.order) {
        orderIds = orderIds.concat(user.order.map((order) => order.id));
      }
    });
  
     // Get order IDs from subusers
     userData.forEach((user) => {
      if (user.subusers) {
        user.subusers.forEach((subuser) => {
          if (subuser.orders) {
            orderIds = orderIds.concat(subuser.orders.map((order) => order.id));
          }
        });
      }
    });


    const ordercountoftheuser = await prisma.order.findMany({
      where: {
        userid: id,
      },
      select: {
        id: true,
      }
    })
    
     // Push the IDs from ordercountoftheuser into orderIds array
     orderIds.push(...ordercountoftheuser.map((order) => order.id));

     

     const ordersDetails = await prisma.order.findMany({
      where: {
        id: {
          in: orderIds, // Filter to select orders whose IDs are in the orderIds array
        }
      }
    })

     return ordersDetails;
   
  }catch(error){
    console.log('error in getting total orders in server side')
    return [];
   
  }
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

 export const getprocessingorders =async (id:string) => {
  const result = prisma.order.findMany({
    where: {
      state : "processing",
      userid: id,
    }
  });
  return result;
 }
//get pending orders

export const getpendingorders =async (id: string) => {
  const result = prisma.order.findMany({
    where: {
      state:"pending",
      userid: id,
    }
  });
  return result;

}
//get completed orders

export const getcompletedorders = async (id: string) => {
  const result = prisma.order.findMany({
    where: {
      state: 'completed',
      userid: id,
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