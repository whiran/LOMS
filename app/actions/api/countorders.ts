'use server'
import prisma from "@/lib/prisma";
import { count } from "console";

//count orders

export const totalcount =async (id: string) => {
  try{
    //get the customers created by the user and get the count of total orders.
    const cuscount = await prisma.user.findMany({
      where: {
        createdby: id
      },
      select: {
        id: true,
        order: {
          select: {
            id: true,
          }
        }
      }
    })
  
    const orderCount = await prisma.order.aggregate({
      _count: {
        id: true, // Counting the 'id' field of the Order model
      },
      where: {
        user: {
          createdby: id, // Filter condition for users with userType as specified
        },
      },
    });

   
 

    let totalOrderCount = 0;

    cuscount.forEach((user) => {
        totalOrderCount += user.order.length;
    });




    const ordercountoftheuser = await prisma.order.count({
      where: {
        userid: id,
      }
    })
    
    const total = totalOrderCount + ordercountoftheuser;
     return total;
   
  }catch(error){
    return 0;
    console.log('error in count total orders in server side')
  }
}


export async function getorderprocessing(id: string){
  try{
    const orderCount = await prisma.order.aggregate({
      _count: {
        id: true, // Counting the 'id' field of the Order model
      },
      where: {
        user: {
          createdby: id, // Filter condition for users with userType as specified
        },
        state: 'processing',
      },
    });

    const ordersofcustomers = orderCount._count.id

    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'processing'
      }
    })

    const counts = admincount + ordersofcustomers;

    return counts;
  }catch(errr){
    console.log(errr);
    return 0;
  }
}

export async function getorderpending(id:string) {
  try{
    const orderCount = await prisma.order.aggregate({
      _count: {
        id: true, // Counting the 'id' field of the Order model
      },
      where: {
        user: {
          createdby: id, // Filter condition for users with userType as specified
        },
        state: 'pending',
      },
    });

    const ordersofcustomers = orderCount._count.id

    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'pending'
      }
    })

    const counts = admincount + ordersofcustomers;

    return counts;
  }catch(error){
    console.log('error on get penging orderes');
    return 0;
  }
}

export async function getordercomplete(id:string) {
  try{
    const orderCount = await prisma.order.aggregate({
      _count: {
        id: true, // Counting the 'id' field of the Order model
      },
      where: {
        user: {
          createdby: id, // Filter condition for users with userType as specified
        },
        state: 'completed',
      },
    });

    const ordersofcustomers = orderCount._count.id

    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'completed'
      }
    })

    const counts = admincount + ordersofcustomers;

    return counts;
  }catch(error){
    console.log('error on get processing orderes count');
    return 0;
  }
}