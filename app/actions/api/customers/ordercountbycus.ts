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

    const ordersofcustomers = orderCount._count.id

    return ordersofcustomers
  }catch(error){
    console.log('error on get completed orderes cus and sub count');
    return 0;
  }
}