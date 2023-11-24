'use server';
import prisma from "@/lib/prisma";

//create  quantity records 

export const createquantity = async (colorcode: string, colorname: string, upcno: string, primarysize: string, secondarysize: string, sellingprice: number, orderqty: string, state3: string) => {
 
   if(colorcode && colorname && upcno && primarysize && secondarysize && sellingprice && orderqty && state3){
    await prisma.contity.create({
      data: {
        color_code: colorcode,
        color_name: colorname,
        upc_no: upcno,
        primary_size: primarysize,
        secondary_size: secondarysize,
        selling_price: sellingprice,
        order_qty: orderqty,
        otherlabel_id: state3
      }
    });
    return "Successfully created new strokeno";
  }else{
    return "Something wrong!";
  }
}