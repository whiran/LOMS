import Misdata from "@/components/Misdata"

export default function Page({ params }: { params: { id: string } }) {

  //dynamic urls based on the id
  
  return (<Misdata id={params.id}/>)
}

