import Misdata from "@/components/Misdata"

export default function Page({ params }: { params: { id: string } }) {
  
  return (<Misdata id={params.id}/>)
}

