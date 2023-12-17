import React from 'react'

type result = {
  id: string;
 email: string;
 password: string;
 userType: string;
 createdAt: Date;
 updatedAt: Date;
 createdby: string | null;
}

type userprops = {
  results: result[]
}


const Tableforcuslist = ({results} : userprops) => {
  return (
    <table className="w-full bg-slate-300 overflow-auto rounded-md">
    <thead>
      <tr>
        <th>Email</th>
        <th>Created at</th>
        <th>Updated at</th>
      </tr>
    </thead>
    <tbody>
     
      {results.map(result => (
        <tr key={result.id}>
          <td>{result.email}</td>
          <td>{result.createdAt.getUTCFullYear()}-{result.createdAt.getUTCMonth()+1}-{result.createdAt.getUTCDate()}</td>
          <td>{result.updatedAt.getUTCDate()}</td>
        </tr>
      ))}
     
    </tbody>
  </table>
  )
}

export default Tableforcuslist