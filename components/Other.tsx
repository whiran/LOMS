import React from 'react'
import Userinputforother from './Userinputforother'
import Otherdata from './Otherdata'

type Props = {}

const Other = (props: Props) => {
  return (
    <div className='overflow-auto w-full'>
    <table className="border-collapse border border-slate-500 text-xs bg-white font-mono 2xl:text-lg xl:text-base">
      <thead className='sticky border top-[-1px] bg-white z-10'>
        <tr>
          <th className='border border-black  w-44'>Ref No</th>
          <th className='border border-black  w-44'>LABEL_TYPE</th>
        </tr>
      </thead>
      <tbody>
          <Otherdata />
          <Userinputforother />
      </tbody>
    </table>
    </div>
  )
}

export default Other