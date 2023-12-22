import { Payment, columns } from "@/app/users/misreport/completed/columns"
import { DataTable } from "@/app/users/misreport/completed/data-table"
import Mainnavbar from "@/components/Mainnavbar";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      stroke: "m@example.com",
    },
    {
      id: "89c4a7d3",
      amount: 75,
      status: "pending",
      stroke: "n@example.com",
    },
    {
      id: "a1b2c3d4",
      amount: 150,
      status: "pending",
      stroke: "o@example.com",
    },
    {
      id: "89c4a7d3",
      amount: 75,
      status: "pending",
      stroke: "n@example.com",
    },
    {
      id: "a1b2c3d4",
      amount: 150,
      status: "pending",
      stroke: "o@example.com",
    },
    {
      id: "a1b2c3d4",
      amount: 150,
      status: "pending",
      stroke: "o@example.com",
    },
    {
      id: "89c4a7d3",
      amount: 75,
      status: "pending",
      stroke: "n@example.com",
    },
    {
      id: "a1b2c3d4",
      amount: 150,
      status: "pending",
      stroke: "o@example.com",
    },
    
    
  ];
  
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div>
    <div className='h-max flex flex-col'>
    <div className="h-[9vh]">
       <Mainnavbar />
    </div>
      <div className='h-max p-0 m-0 w-full flex justify-center items-center'>
       <DataTable columns={columns} data={data} />
      </div>
    </div>
    </div>
  )
}
