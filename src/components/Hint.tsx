import React from 'react'

interface HintProps {
  position:{x:number, y:number},
  zoom:number,
  text:string
}

const Hint = ({position, zoom, text}:HintProps) => {
  return (
    <div
      className='absolute flex items-center justify-center p-[10px] min-w-[300px] rounded-md drop-shadow-md bg-white pointer-events-none'
      style={{
      transform:`
        translate(${position.x*zoom}px, ${position.y*zoom}px)
        scale(${zoom})
      `
      }}
    >
      <p
      className='text-black'
      >
      {text}
      </p>
    </div>
  )
}

export default Hint