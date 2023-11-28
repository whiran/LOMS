import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  //loading page when slow 
  return (
    <main className='text-center'>
      <h2 className='text-primary'>Loading ....</h2>
      <p>Hopefully not for too long</p>
    </main>
  )
}

export default Loading