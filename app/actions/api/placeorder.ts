'use server'
import prisma from "@/lib/prisma";
import nodemailer from 'nodemailer';


//place order admin, customer

export const placeorder = async function placeorder(strokenum: string, contractnum:string,coo: string, fiber: string, component: string, caretext: string, washsimbol: string, sizeration: string, userid: string, qty?: number, states?: string) {

  

  if(strokenum && contractnum && coo && fiber && component && caretext && washsimbol && sizeration && userid && states) {
    const result = await prisma.order.create({
      data: {
        strokenum,
        contractnum,
        coo,
        fiber,
        component,
        caretext,
        washsimbol,
        sizeration,
        userid,
        qty,
        orderstatefromuser: states,
      }
    }
    )
    if(result){
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'simple.things.tj@gmail.com', 
          pass: 'peic qxps fdwi oxrs'  
        }
      });
      const htmlContent = `
        <html>
          <head>
           <style>
              /* Define your CSS styles here */
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                border-width: 5px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f7bcbc;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
              p {
                color: #666;
              }
              .order-details {
                margin-top: 20px;
                border-top: 1px solid #ccc;
                padding-top: 20px;
              }
              .order-info {
                margin-bottom: 10px;
              }
              .info-label {
                font-weight: bold;
              }
            </style>
          </head>
          <body>
           <div class="container">
              <div class="order-info">
                    <span class="info-label">Order ID:</span>${result.id} <!-- Replace with your order ID -->
             </div>
            <div class="order-info">
               <span class="info-label">Date:</span>${result.createdAt.getDate()} - ${result.createdAt.getMonth()+1} - ${result.createdAt.getFullYear()}. <!-- Replace with order date -->
            </div>
               <h1>Hello!</h1>
               <p>Order Placed successfully🥳</p><br>
               <p>This is a system-generated email. If you have any questions regarding your order, please contact us.<br>Label Management system</p><br>
               </div>
               
          </body>

        </html>
      `;

      await transporter.sendMail({
        from: 'simple.things.tj@gmail.com',   
        to: 'nalindume@gmail.com', 
        subject: `Order Placed successfully 🚀`,
        html: htmlContent,
      })

    }
    return('ok');
  }else{
    return('something wrong!')
  }
}