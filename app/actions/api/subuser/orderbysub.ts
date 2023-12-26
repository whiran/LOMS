'use server'

import prisma from "@/lib/prisma"

//get the order by sub total

export const totcountsub = async (id: string) =>{
  try{
    const result = await prisma.order.findMany({
      where: {
        userid: id,
      },
      select: {
        id: true,
      }
    });
    
    
    const cusids:string[] = result.map(resu => resu.id);
    

    let subcount:number = cusids.length
;

   
    return subcount
  }catch(error){
    console.log('got error while searching the sub customer order ids');
    return 0;
  }

}

//get the processing orders by sub user

export const getprocessingordersub = async (id:string) => {

  try{
    


    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'processing'
      }
    })

    const counts = admincount;
    return counts
  }catch(error){
    console.log('got error when counting the proccessing order by sub')
    return 0;
  }
}

//get the total pending by customer

export const tototalpendingsub = async (id:string) => {

  try{
  
    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'pending'
      }
    });

    const counts = admincount;

    return counts;
  }catch(error){
    console.log('error on get penging orderes by sub');
    return 0;
  }
}

//get the completed orders by sub

export const gettotalcompletedsub = async(id:string) => {
  try{
   
    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'completed'
      }
    });

    const ordersofcustomers =  admincount

    return ordersofcustomers
  }catch(error){
    console.log('error on get completed orderes sub count');
    return 0;
  }
}


//get hold orders

export const gettotalholdsub = async(id:string) => {
  try{
    

    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'hold'
      }
    });

    const ordersofcustomers = admincount

    return ordersofcustomers
  }catch(error){
    console.log('error on get hold orderes sub count');
    return 0;
  }
}

//get the order count of this month

export const getcountofordersthismonthsub = async(id:string) => {
  try{
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    

    const admincount = await prisma.order.count({
      where: {
        userid: id,
        createdAt: {
          gte: startOfMonth.toISOString(),
          lte: endOfMonth.toISOString(),
        },
      }
    });

    const ordersofcustomers =  admincount

    return ordersofcustomers
  }catch(error){
    console.log('error on get this month order count sub count');
    return 0;
  }
}


//get the order list of this month as array

export const getcountofordersthismonthdatearraysub = async(id:string) => {
  try{
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    

    let subids:Date[] = [];

   
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

    

    return cusoids
  }catch(error){
    console.log('error on get completed orderes cus and sub count');
    return [];
  }
}


//get the month and count for barchart sub

export const getmonthtotdatasub = async (id:string) => {

  try{
    const result = await prisma.order.findMany({
      where: {
        userid: id,
      },
      select: {
        id: true,
      }
    });
    
    

    const cusids:string[] = result.map(resu => resu.id);
   

    

    

    const records = await prisma.order.findMany({
      where: {
        id: {
          in: cusids,
        }
      }
    })
    //structure

    const monthsData: { [key: number]: number } = {};

    records.forEach((reco) => {
      const createdAt = new Date(reco.createdAt);
      const month = createdAt.getMonth() + 1; // Adding 1 to adjust from 0-indexed to 1-indexed months
      if (!monthsData[month]) {
        monthsData[month] = 0;
      }
      monthsData[month]++;
    })

     // Generate an array with all months of the year and their counts
     const allMonths: { month: number; count: number }[] = [];
     for (let i = 1; i <= 12; i++) {
       const count = monthsData[i] || 0;
       allMonths.push({ month: i, count });
     }
 
     return allMonths;
  }catch(error){
    console.log('got and error while gettting the orders placed by subcustomer on evey month');
    return []
  }
}