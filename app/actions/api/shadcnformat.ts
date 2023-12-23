'use server'


import prisma from "@/lib/prisma";
//for admin
//get orders
// all orders
export const getordersshadcn = async(id: string) =>{
  const result = await prisma.order.findMany({
    where: {
      userid: id,
    }
  });
  return result;
}

//orders data
//get sub and cus order list
export const getcusordersshad = async(id: string) => {
  try{
    //get the admin orders list
    const result = await prisma.order.findMany({
      where: {
        userid: id,
      },
      select: {
        id: true,
        strokenum:true,
        qty: true,
        state: true,
      }
    });

    //get the customers created by the user and get the count of total orders.

    const userData = await prisma.user.findMany({
      where: {
        createdby: id
      },
      select: {
        order: {
          select: {
            id: true,
            strokenum:true,
            qty: true,
            state: true,
          }
        },
        subusers: {
          select: {
            orders: {
              select: {
                id: true,
                strokenum:true,
                qty: true,
                state: true,
              }
            }
          }
        }
      }
    })
    type order = {
      id: string;
      amount: number | null;
      status: "pending" | "processing" | "completed" | "hold";
      stroke: string;
    }
        
    // Merge orders from the `result` query and `subusers` query into a single array
    const combinedOrders:order[] = [];

    result.forEach(order => {
      combinedOrders.push({
        id: order.id,
        amount: order.qty, // Assuming qty represents the amount
        status: order.state, // Assuming state represents the status
        stroke: order.strokenum,
      });
    });

    userData.forEach((user) => {
      user.order.forEach((o) => {
        combinedOrders.push({
          id: o.id,
          amount: o.qty,
          status: o.state,
          stroke: o.strokenum
        });
      });
      user.subusers.forEach((sub) => {
        sub.orders.forEach((o) => {
          combinedOrders.push({
            id: o.id,
            amount: o.qty,
            status: o.state,
            stroke: o.strokenum
          });
        })
      })
    })

     return combinedOrders;
   
  }catch(error){
    console.log('error in getting total orders in server side')
    return [];
   
  }
}


//get the completed orders shadcn fromat

export const getallcompletedorderdatashadcn = async (id: string) => {

  try{
    //get the admin data
    const result = await prisma.order.findMany({
      where: {
        userid: id,
        state: 'completed'
      },
      select: {
        id: true,
        strokenum:true,
        qty: true,
        state: true,
      }
    });
    


     const userData = await prisma.user.findMany({
      where: {
        createdby: id
      },
      select: {
        order: {
          select: {
            id: true,
            strokenum:true,
            qty: true,
            state: true,
          }
        },
        subusers: {
          select: {
            orders: {
              select: {
                id: true,
                strokenum:true,
                qty: true,
                state: true,
              }
            }
          }
        }
      }
    })
    type order = {
      id: string;
      amount: number | null;
      status: "pending" | "processing" | "completed" | "hold";
      stroke: string;
    }
        
    // Merge orders from the `result` query and `subusers` query into a single array
    const combinedOrders:order[] = [];

    //push the admin data to array
    result.forEach(order => {
      combinedOrders.push({
        id: order.id,
        amount: order.qty, // Assuming qty represents the amount
        status: order.state, // Assuming state represents the status
        stroke: order.strokenum,
      });
    });

// Merge orders from the `subusers` query

userData.forEach((user) => {
  user.order.forEach((o) => {
    if(o.state == 'completed'){
      combinedOrders.push({
        id: o.id,
        amount: o.qty,
        status: o.state,
        stroke: o.strokenum
      });
    }
  });
  user.subusers.forEach((sub) => {
    sub.orders.forEach((o) => {
      if(o.state == "completed"){
        combinedOrders.push({
          id: o.id,
          amount: o.qty,
          status: o.state,
          stroke: o.strokenum
        });
      }
    })
  })
})
 
 return combinedOrders;
  }catch(error){
    console.log('got error while searching the customer and sub customer  completed order ids');
    return []
  }
}


//get the pending orders shadcn fromat

export const getallpendingorderdatashadcn = async (id: string) => {

  try{
    //get the admin data
    const result = await prisma.order.findMany({
      where: {
        userid: id,
        state: 'pending'
      },
      select: {
        id: true,
        strokenum:true,
        qty: true,
        state: true,
      }
    });
    


     const userData = await prisma.user.findMany({
      where: {
        createdby: id
      },
      select: {
        order: {
          select: {
            id: true,
            strokenum:true,
            qty: true,
            state: true,
          }
        },
        subusers: {
          select: {
            orders: {
              select: {
                id: true,
                strokenum:true,
                qty: true,
                state: true,
              }
            }
          }
        }
      }
    })
    type order = {
      id: string;
      amount: number | null;
      status: "pending" | "processing" | "completed" | "hold";
      stroke: string;
    }
        
    // Merge orders from the `result` query and `subusers` query into a single array
    const combinedOrders:order[] = [];

    //push the admin data to array
    result.forEach(order => {
      combinedOrders.push({
        id: order.id,
        amount: order.qty, // Assuming qty represents the amount
        status: order.state, // Assuming state represents the status
        stroke: order.strokenum,
      });
    });

// Merge orders from the `subusers` query

userData.forEach((user) => {
  user.order.forEach((o) => {
    if(o.state == 'pending'){
      combinedOrders.push({
        id: o.id,
        amount: o.qty,
        status: o.state,
        stroke: o.strokenum
      });
    }
  });
  user.subusers.forEach((sub) => {
    sub.orders.forEach((o) => {
      if(o.state == 'pending'){
        combinedOrders.push({
          id: o.id,
          amount: o.qty,
          status: o.state,
          stroke: o.strokenum
        });
      }
    })
  })
})
 
 return combinedOrders;
  }catch(error){
    console.log('got error while searching the customer and sub customer pending order data');
    return []
  }
}


//get the processing orders shadcn fromat

export const getallprocessingorderdatashadcn = async (id: string) => {

  try{
    //get the admin data
    const result = await prisma.order.findMany({
      where: {
        userid: id,
        state: 'processing'
      },
      select: {
        id: true,
        strokenum:true,
        qty: true,
        state: true,
      }
    });
    


     const userData = await prisma.user.findMany({
      where: {
        createdby: id
      },
      select: {
        order: {
          select: {
            id: true,
            strokenum:true,
            qty: true,
            state: true,
          }
        },
        subusers: {
          select: {
            orders: {
              select: {
                id: true,
                strokenum:true,
                qty: true,
                state: true,
              }
            }
          }
        }
      }
    })
    type order = {
      id: string;
      amount: number | null;
      status: "pending" | "processing" | "completed" | "hold";
      stroke: string;
    }
        
    // Merge orders from the `result` query and `subusers` query into a single array
    const combinedOrders:order[] = [];

    //push the admin data to array
    result.forEach(order => {
      combinedOrders.push({
        id: order.id,
        amount: order.qty, // Assuming qty represents the amount
        status: order.state, // Assuming state represents the status
        stroke: order.strokenum,
      });
    });

// Merge orders from the `subusers` query

userData.forEach((user) => {
  user.order.forEach((o) => {
    if(o.state == 'processing'){
      combinedOrders.push({
        id: o.id,
        amount: o.qty,
        status: o.state,
        stroke: o.strokenum
      });
    }
  });
  user.subusers.forEach((sub) => {
    sub.orders.forEach((o) => {
      if(o.state == 'processing'){
        combinedOrders.push({
          id: o.id,
          amount: o.qty,
          status: o.state,
          stroke: o.strokenum
        });
      }
    })
  })
})
 
 return combinedOrders;
  }catch(error){
    console.log('got error while searching the customer and sub customer processing  order data');
    return []
  }
}


//get the holdorders shadcn fromat

export const getallholdorderdatashadcn = async (id: string) => {

  try{
    //get the admin data
    const result = await prisma.order.findMany({
      where: {
        userid: id,
        state: 'hold'
      },
      select: {
        id: true,
        strokenum:true,
        qty: true,
        state: true,
      }
    });
    


     const userData = await prisma.user.findMany({
      where: {
        createdby: id
      },
      select: {
        order: {
          select: {
            id: true,
            strokenum:true,
            qty: true,
            state: true,
          }
        },
        subusers: {
          select: {
            orders: {
              select: {
                id: true,
                strokenum:true,
                qty: true,
                state: true,
              }
            }
          }
        }
      }
    })
    type order = {
      id: string;
      amount: number | null;
      status: "pending" | "processing" | "completed" | "hold";
      stroke: string;
    }
        
    // Merge orders from the `result` query and `subusers` query into a single array
    const combinedOrders:order[] = [];

    //push the admin data to array
    result.forEach(order => {
      combinedOrders.push({
        id: order.id,
        amount: order.qty, // Assuming qty represents the amount
        status: order.state, // Assuming state represents the status
        stroke: order.strokenum,
      });
    });

// Merge orders from the `subusers` query

userData.forEach((user) => {
  user.order.forEach((o) => {
    if(o.state == 'hold'){
      combinedOrders.push({
        id: o.id,
        amount: o.qty,
        status: o.state,
        stroke: o.strokenum
      });
    }
  });
  user.subusers.forEach((sub) => {
    sub.orders.forEach((o) => {
      if(o.state == 'hold'){
        combinedOrders.push({
          id: o.id,
          amount: o.qty,
          status: o.state,
          stroke: o.strokenum
        });
      }
    })
  })
})
 
 return combinedOrders;
  }catch(error){
    console.log('got error while searching the customer and sub customer hold  order data');
    return []
  }
}

