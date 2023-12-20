'use server'
import prisma from "@/lib/prisma";
import { count } from "console";

//count orders
//totoal of 3 user levels based on admin
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
        },
        subusers: {
          select: {
            ownid: true,
            orders: {
              select: {
                id: true,
              }
            }
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

   
    let totalsubusercount = 0;



    let totalOrderCount = 0;

    cuscount.forEach((user) => {
        totalOrderCount += user.order.length;
    });

   

    cuscount.forEach((user) => {
      user.subusers.forEach((u) => {
        totalsubusercount += u.orders.length;
      })
  });



    const ordercountoftheuser = await prisma.order.count({
      where: {
        userid: id,
      }
    })
    const total = totalOrderCount + ordercountoftheuser + totalsubusercount;
     return total;
   
  }catch(error){
    console.log('error in count total orders in server side')
    return 0;
   
  }
}

//processing all orders based on admin
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
    //by subuser
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
        },
        subusers: {
          select: {
            ownid: true,
            orders: {
              select: {
                id: true,
                state: true,
              }
            }
          }
        }
      }
    })

    let totalsubusercount = 0;

    cuscount.forEach((user) => {
      user.subusers.forEach((u) => {
        u.orders.forEach((s) => {
          if(s.state == 'processing'){
            totalsubusercount ++;
          }
        })
      })
  });

 


    //by admin
    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'processing'
      }
    })

    
    

    const counts = admincount + ordersofcustomers + totalsubusercount;

    return counts;
  }catch(errr){
    console.log(errr);
    return 0;
  }
}


//get all pendding orders based on admin
export async function getorderpending(id:string) {
  try{
    // admin's customers order count
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
    
        //by subuser
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
            },
            subusers: {
              select: {
                ownid: true,
                orders: {
                  select: {
                    id: true,
                    state: true,
                  }
                }
              }
            }
          }
        })
    
        let totalsubusercount = 0;
    
        cuscount.forEach((user) => {
          user.subusers.forEach((u) => {
            u.orders.forEach((s) => {
              if(s.state == "pending"){
                totalsubusercount ++;
              }
            })
          })
      });
    
     
    

    const ordersofcustomers = orderCount._count.id

    //admin's order count
    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'pending'
      }
    })

    //totoal
    const counts = admincount + ordersofcustomers + totalsubusercount;

    return counts;
  }catch(error){
    console.log('error on get penging orderes');
    return 0;
  }
}


//get completed all orders based on admin
export async function getordercomplete(id:string) {
  try{

    //by customer
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

        //by subuser
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
            },
            subusers: {
              select: {
                ownid: true,
                orders: {
                  select: {
                    id: true,
                    state: true,
                  }
                }
              }
            }
          }
        })
    
        let totalsubusercount = 0;
    
        cuscount.forEach((user) => {
          user.subusers.forEach((u) => {
            u.orders.forEach((s) => {
              if(s.state == "completed"){
                totalsubusercount ++;
              }
            })
          })
      });
    
    
 
    //by admin
    const admincount = await prisma.order.count({
      where: {
        userid: id,
        state: 'completed'
      }
    })

    const counts = admincount + ordersofcustomers;

    return counts;
  }catch(error){
    console.log('error on get completed orderes count');
    return 0;
  }
}