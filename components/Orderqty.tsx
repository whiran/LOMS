'use client'
import { getorders } from '@/app/actions/api/getorders';
import { orderqty } from '@/app/actions/api/orderqty';
import React, { useEffect, useState } from 'react'


type order = {
  id: string;
  coo: string;
  fiber: string;
  component: string;
  caretext: string;
  washsimbol: string;
  sizeration: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  ordervalue?: number | null;
  qty?: number | null;
}

type Props = {
  orders: order[];
  val: { [key: string]: number };
}

const Orderqty = (props: Props) => {
  const [orders, setOrders] = useState<order[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [boolval, setBoolval] = useState(true);

  useEffect(() =>{
    const fetchdata = async () => {
      setOrders(props.orders);
      setQuantities(props.val);
    };
   fetchdata();
  },[props])

  
  
  const handleQuantityChange = (orderId: string, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [orderId]: quantity,
     
    }));
    console.log(quantities[orderId])
  };

  const handleSubmit = async(orderId: string) => {
    // Access the quantity for the specific order ID and perform your desired action
    const quantity = quantities[orderId];
    // Here, you can save the quantity to a variable or perform other operations
    await handleQuantityChange(orderId, quantities[orderId]);
    const result = await orderqty(orderId,quantity);
    console.log(result)
    setBoolval(!boolval);
  };
  return (
    <div className='w-screen h-full bg-slate-300'>
      <div className='w-11/12 border-2 rounded-md mx-auto mt-4 bg-white flex flex-col'>
        <div className='text-lg bg-cyan-500 flex'><p className='ml-2 font-medium'>Order Details</p></div>
        <table className='overflow-auto w-full'>
          <thead className='font-normal'>
            <tr>
              <th>Coo</th>
              <th>Fiber</th>
              <th>component</th>
              <th>caretext</th>
              <th>washsimbol</th>
              <th>sizeration</th>
              <th>state</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
            <tr key={order.id} className='border-t-1'>
              <td>{order.coo}</td>
              <td>{order.fiber}</td>
              <td>{order.component}</td>
              <td>{order.caretext}</td>
              <td>{order.washsimbol}</td>
              <td>{order.sizeration}</td>
              <td>{order.state}</td>
              <td className='w-24'>
                {
                (order.qty  !== null)? (<input type='number' required placeholder='Quantity'  onChange={(e) => handleQuantityChange(order.id, parseInt(e.target.value))} value={quantities[order.id] }/>):(<input type='number' required placeholder='Quantity'  onChange={(e) => handleQuantityChange(order.id, parseInt(e.target.value))}/>)
                }
                </td>
              <td className='w-16'><button className='bg-sky-500 p-2 border rounded-sm' onClick={() => handleSubmit(order.id)}>submit</button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orderqty