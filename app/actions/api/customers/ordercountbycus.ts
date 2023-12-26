'use server'

import prisma from "@/lib/prisma"

//get the total count of orders by customer and subcustomer
export const totcountcus = async (id: string) =>{
  try{
    const result = await prisma.order.findMany({
      where: {
        userid: id,
      },
      select: {
        id: true,
      }
    });
    
    const subusers = await prisma.user.findMany({
      where: {
        createdby: id,
      },
      select: {
        order: {
          select: {
            id: true,
          }
        }
      }
    });

    const cusids:string[] = result.map(resu => resu.id);
    

    let subcount:number = 0;

    subusers.forEach(sub => {
      subcount += sub.order.length
    });

    let total = subcount + cusids.length;

   
    return total
  }catch(error){
    console.log('got error while searching the customer and sub customer order ids');
    return 0;
  }

}


export const getprocessingordercus = async (id:string) => {

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

    const counts = admincount + ordersofcustomers
    return counts
  }catch(error){
    console.log('got error when counting the proccessing order by cus and sub')
    return 0;
  }
}

export const tototalpendingcusandsub = async (id:string) => {

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

    //custoemr's order count
    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'pending'
      }
    });

    const counts = admincount + ordersofcustomers;

    return counts;
  }catch(error){
    console.log('error on get penging orderes');
    return 0;
  }
}

export const gettotalcompletedcusandsub = async(id:string) => {
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

    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'completed'
      }
    });

    const ordersofcustomers = orderCount._count.id + admincount

    return ordersofcustomers
  }catch(error){
    console.log('error on get completed orderes cus and sub count');
    return 0;
  }
}

export const gettotalholdcusandsub = async(id:string) => {
  try{
    const orderCount = await prisma.order.aggregate({
      _count: {
        id: true, // Counting the 'id' field of the Order model
      },
      where: {
        user: {
          createdby: id, // Filter condition for users with userType as specified
        },
        state: 'hold',
      },
    });

    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'hold'
      }
    });

    const ordersofcustomers = orderCount._count.id + admincount

    return ordersofcustomers
  }catch(error){
    console.log('error on get completed orderes cus and sub count');
    return 0;
  }
}


export const getcountofordersthismonth = async(id:string) => {
  try{
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const orderCount = await prisma.order.aggregate({
      _count: {
        id: true, // Counting the 'id' field of the Order model
      },
      where: {
        user: {
          createdby: id, // Filter condition for users with userType as specified
        },
        createdAt: {
          gte: startOfMonth.toISOString(),
          lte: endOfMonth.toISOString(),
        },
      },
    });

    const admincount = await prisma.order.count({
      where: {
        userid: id,
        createdAt: {
          gte: startOfMonth.toISOString(),
          lte: endOfMonth.toISOString(),
        },
      }
    });

    const ordersofcustomers = orderCount._count.id + admincount

    return ordersofcustomers
  }catch(error){
    console.log('error on get completed orderes cus and sub count');
    return 0;
  }
}

export const getcountofordersthismonthdatearray = async(id:string) => {
  try{
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const orderCount = await prisma.user.findMany({
      where: {
          createdby: id, // Filter condition for users with userType as specified
        },
      select:{
        order: {
          select:{
            createdAt: true,
          }
        }
      }
    });

    let subids:Date[] = [];

    orderCount.forEach((order) => {
      order.order.forEach((o) => {
        subids.push(o.createdAt)
      })
    })

    const admincount = await prisma.order.findMany({
      where: {
        userid: id,
        createdAt: {
          gte: startOfMonth.toISOString(),
          lte: endOfMonth.toISOString(),
        },
      },
      select: {
        createdAt: true,
      }
    });

   

    const cusoids:Date[] = admincount.map(resu => resu.createdAt);

    //concat all dates

    const lastdates = cusoids.concat(subids);

    return lastdates
  }catch(error){
    console.log('error on get completed orderes cus and sub count');
    return [];
  }
}