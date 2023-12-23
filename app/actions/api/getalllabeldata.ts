'use server'


import prisma from "@/lib/prisma";
import { stroke } from "pdfkit";

//get all contracts data
type Contract = {
  constractno: string;
  stroke_id: string;
  createdAt: Date;
}

type Care = {
  createdAt: Date;
  id: string;
  fibre: string;
}

type Other = {
  id: string,
  createdAt: Date,
  fef_no: string,
}

type Quntity = {
  id: string,
  createdAt: Date,
  upc_no: string,
}

export const gettherecords = async (id: string, type: string) => {
  try{
    
    
  if(type == 'con'){
    const stroke = await prisma.stroke.findMany({
      where: {
        userid: id,
      },
      select: {
        contracts:{
          select: {
            constractno: true,
            stroke_id: true,
            createdAt: true,
          }
        },
       }
      });


      
    let contractdata:Contract[] = []

    stroke.forEach((strok) => {
      strok.contracts.forEach((con) => {
        contractdata.push(con);
      });
      
    });

    return contractdata;
    }else if(type == 'care'){
      const stroke = await prisma.stroke.findMany({
        where: {
          userid: id,
        },
        select: {
          contracts:{
            select: {
              carelabel: {
                select:{
                  createdAt: true,
                  id: true,
                   fibre: true,
                }
                }
              },
            }
          },
         
        });

        let caredata:Care[] = []

    stroke.forEach((strok) => {
      strok.contracts.forEach((con) => {
        if(con.carelabel){
          con.carelabel.forEach((care) => {
            caredata.push(care);
          })
        }
      });
      
    });
   
    return caredata;

    }else if(type == 'other'){

      const stroke = await prisma.stroke.findMany({
        where: {
          userid: id,
        },
        select: {
          contracts:{
            select: {
              carelabel: {
                select: {
                  otherlabel: {
                    select: {
                      id: true,
                      createdAt: true,
                      fef_no: true,
                    }
                  }
                }
              },
            }
          },
         }
        });

        let otherdata:Other[] = []

    stroke.forEach((strok) => {
      strok.contracts.forEach((con) => {
        if(con.carelabel){
          con.carelabel.forEach((care) => {
            if(care.otherlabel){
              care.otherlabel.forEach((ca) => {
                otherdata.push(ca);
              })
            }
          })
        }
      });
      
    });

    return otherdata;

    }else if(type == 'qun'){

      const stroke = await prisma.stroke.findMany({
        where: {
          userid: id,
        },
        select: {
          contracts:{
            select: {
              carelabel: {
                select: {
                  otherlabel: {
                    select: {
                     contity: {
                      select: {
                        id: true,
                        createdAt: true,
                        upc_no: true,
                      }
                     }
                    }
                  }
                }
              },
            }
          },
         }
        });

        let quantitydatas:Quntity[] = []

    stroke.forEach((strok) => {
      strok.contracts.forEach((con) => {
        if(con.carelabel){
          con.carelabel.forEach((care) => {
            if(care.otherlabel){
              care.otherlabel.forEach((ca) => {
                if(ca.contity){
                  ca.contity.forEach((con) => {
                    quantitydatas.push(con);
                  })
                }
              })
            }
          })
        }
      });
      
    });

    return quantitydatas;
    }else{
      return [];
    }

    
  }catch(error){
    return []
    console.log('got an erro while getting the admin lable data.')
  }
}

export const constractdata =async () => {
  const result = await prisma.contract.findMany();
  return result;
}

export const caredata = async () => {
  const result = await prisma.carelabel.findMany();
  return result;
}

export const otherdata =async () => {
  const result = await prisma.otherlabel.findMany();
  return result;
}

export const quantitydata =async () => {
  const result = await prisma.contity.findMany();
  return result;
}