import React from 'react'
import Image from 'next/image'

type Props = {
  url: string;
}

const Showimg = (props: Props) => {
  return (
    <Image 
    src={`/${props.url}.png`}
    width={300}
    height={500}
    alt="Picture of the label"
    />
  )
}

export default Showimg